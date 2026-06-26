-- RLS Policies for users table
CREATE POLICY users_select ON users
  FOR SELECT USING (auth.uid() = id OR auth.uid() IS NULL);

CREATE POLICY users_update ON users
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY users_delete ON users
  FOR DELETE USING (auth.uid() = id);

CREATE POLICY users_insert ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for nominees table
CREATE POLICY nominees_select_owner ON nominees
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY nominees_select_nominee ON nominees
  FOR SELECT USING (auth.uid()::text = (
    SELECT id::text FROM auth.users WHERE email = nominees.email
  ) AND email_verified = true);

CREATE POLICY nominees_insert ON nominees
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY nominees_update ON nominees
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY nominees_delete ON nominees
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for documents table
CREATE POLICY documents_select_owner ON documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY documents_select_approved_nominee ON documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM access_requests ar
      WHERE ar.document_id = documents.id
      AND ar.nominee_id IN (
        SELECT id FROM nominees
        WHERE email = auth.jwt() ->> 'email'
      )
      AND ar.status = 'approved'
      AND ar.token_expires > NOW()
    )
  );

CREATE POLICY documents_insert ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY documents_update ON documents
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY documents_delete ON documents
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for access_requests table
CREATE POLICY access_requests_select_owner ON access_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY access_requests_select_nominee ON access_requests
  FOR SELECT USING (
    auth.uid()::text = (
      SELECT id::text FROM auth.users WHERE email = (
        SELECT email FROM nominees WHERE id = access_requests.nominee_id
      )
    )
  );

CREATE POLICY access_requests_insert ON access_requests
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM nominees
      WHERE id = nominee_id
      AND email = auth.jwt() ->> 'email'
      AND email_verified = true
    )
  );

CREATE POLICY access_requests_update_owner ON access_requests
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for audit_logs table
CREATE POLICY audit_logs_select ON audit_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY audit_logs_insert ON audit_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- RLS Policies for inactivity_recovery table
CREATE POLICY inactivity_recovery_select ON inactivity_recovery
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY inactivity_recovery_insert ON inactivity_recovery
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY inactivity_recovery_update ON inactivity_recovery
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
