import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL(`/auth/login?error=${error}`, requestUrl.origin));
  }

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies });
      
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('Auth exchange error:', exchangeError);
        return NextResponse.redirect(new URL('/auth/login?error=auth_error', requestUrl.origin));
      }
      
      return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
    } catch (err) {
      console.error('Callback error:', err);
      return NextResponse.redirect(new URL('/auth/login?error=callback_error', requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL('/auth/login?error=no_code', requestUrl.origin));
}
