import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, name, accessLevel, documentIds } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Create nominee record
    const { data, error } = await supabase
      .from('nominees')
      .insert([
        {
          user_id: session.user.id,
          email,
          name,
          access_level: accessLevel || 'view',
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    // Send nominee access to specified documents
    if (documentIds && documentIds.length > 0) {
      const accesses = documentIds.map((docId: string) => ({
        nominee_id: data?.[0]?.id,
        document_id: docId,
        access_granted_at: new Date().toISOString(),
      }));

      const { error: accessError } = await supabase
        .from('nominee_document_access')
        .insert(accesses);

      if (accessError) throw accessError;
    }

    return NextResponse.json({ nominee: data?.[0] }, { status: 201 });
  } catch (error) {
    console.error('Invite nominee error:', error);
    return NextResponse.json({ error: 'Failed to invite nominee' }, { status: 500 });
  }
}
