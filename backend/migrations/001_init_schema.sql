-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email VARCHAR UNIQUE NOT NULL,
  full_name VARCHAR,
  phone VARCHAR,
  profile_picture_url VARCHAR,
  storage_provider VARCHAR DEFAULT 'google_drive' CHECK (storage_provider IN ('google_drive', 'onedrive', 'both')),
  familyvault_folder_id VARCHAR,
  inactivity_days INT DEFAULT 90 CHECK (inactivity_days IN (90, 180, 365)),
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  created_by UUID
);

-- Create nominees table
CREATE TABLE nominees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR,
  relationship VARCHAR CHECK (relationship IN ('spouse', 'child', 'parent', 'sibling', 'friend', 'other')),
  nominee_type VARCHAR CHECK (nominee_type IN ('primary', 'secondary')),
  email_verified BOOLEAN DEFAULT false,
  verification_token VARCHAR UNIQUE,
  verification_token_expires TIMESTAMP,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'revoked')),
  access_categories TEXT[],
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP,
  UNIQUE(user_id, email)
);

-- Create documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR CHECK (category IN ('identity', 'insurance', 'property', 'investments', 'medical', 'legal', 'digital_assets', 'education', 'other')),
  storage_provider VARCHAR CHECK (storage_provider IN ('google_drive', 'onedrive')),
  file_id VARCHAR NOT NULL,
  folder_id VARCHAR NOT NULL,
  file_size BIGINT,
  mime_type VARCHAR,
  is_shared BOOLEAN DEFAULT false,
  expiry_date TIMESTAMP,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, file_id)
);

-- Create access_requests table
CREATE TABLE access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  nominee_id UUID NOT NULL REFERENCES nominees(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
  otp_code VARCHAR,
  otp_expires TIMESTAMP,
  otp_verified BOOLEAN DEFAULT false,
  owner_approval_status VARCHAR CHECK (owner_approval_status IN ('pending', 'approved', 'rejected')),
  temporary_token VARCHAR UNIQUE,
  token_expires TIMESTAMP,
  access_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  approved_at TIMESTAMP,
  accessed_at TIMESTAMP
);

-- Create inactivity_recovery table
CREATE TABLE inactivity_recovery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  last_active_date TIMESTAMP,
  recovery_status VARCHAR DEFAULT 'active' CHECK (recovery_status IN ('active', 'warning_1', 'warning_2', 'warning_3', 'threshold_reached')),
  nominees_notified BOOLEAN DEFAULT false,
  nominees_notified_at TIMESTAMP,
  recovery_completed BOOLEAN DEFAULT false,
  recovery_completed_at TIMESTAMP,
  granting_nominee_1_id UUID REFERENCES nominees(id) ON DELETE SET NULL,
  granting_nominee_2_id UUID REFERENCES nominees(id) ON DELETE SET NULL,
  granted_categories TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR NOT NULL CHECK (action IN ('login', 'logout', 'upload', 'delete', 'access_request', 'access_approval', 'access_revocation', 'document_view', 'nominee_added', 'nominee_removed', 'settings_updated')),
  resource_type VARCHAR,
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  status VARCHAR CHECK (status IN ('success', 'failure')),
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create email_logs table
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email VARCHAR NOT NULL,
  email_type VARCHAR CHECK (email_type IN ('otp', 'invitation', 'reminder', 'alert', 'recovery', 'approval_request')),
  subject VARCHAR,
  related_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  related_nominee_id UUID REFERENCES nominees(id) ON DELETE SET NULL,
  status VARCHAR DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
  error_message TEXT,
  opened BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create inactivity_reminders table
CREATE TABLE inactivity_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reminder_number INT,
  reminder_type VARCHAR CHECK (reminder_type IN ('email_to_user', 'email_to_nominees')),
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_nominees_user_id ON nominees(user_id);
CREATE INDEX idx_access_requests_user_id ON access_requests(user_id);
CREATE INDEX idx_access_requests_nominee_id ON access_requests(nominee_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_inactivity_recovery_user_id ON inactivity_recovery(user_id);
CREATE INDEX idx_documents_search ON documents USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE nominees ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
