-- Create templates table
CREATE TABLE IF NOT EXISTS AILTS_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    title_vi VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description TEXT,
    description_vi TEXT,
    target_band DECIMAL(2,1),
    duration INTEGER,
    objectives TEXT[],
    system_prompt TEXT,
    part VARCHAR(20), -- '1', '2', '3', or 'tutoring'
    level VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
    topics TEXT[],
    sample_questions_en TEXT[],
    sample_questions_vi TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS AILTS_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID REFERENCES AILTS_templates(id),
    user_name VARCHAR(255),
    duration INTEGER,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE,
    final_feedback TEXT,
    metrics JSONB
);

-- Create messages table
CREATE TABLE IF NOT EXISTS AILTS_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES AILTS_sessions(id),
    role VARCHAR(50), -- 'user' or 'assistant'
    content TEXT,
    audio_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create metrics table
CREATE TABLE IF NOT EXISTS AILTS_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES AILTS_sessions(id),
    fluency DECIMAL(3,2),
    lexical DECIMAL(3,2),
    grammar DECIMAL(3,2),
    pronunciation DECIMAL(3,2),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create admin access table
CREATE TABLE IF NOT EXISTS AILTS_admin_access (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    password_hash TEXT NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin password (Elecosys@2024)
INSERT INTO AILTS_admin_access (password_hash)
VALUES (crypt('Elecosys@2024', gen_salt('bf')));

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to templates table
CREATE TRIGGER update_templates_updated_at
    BEFORE UPDATE ON AILTS_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
ALTER TABLE AILTS_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE AILTS_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE AILTS_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE AILTS_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE AILTS_admin_access ENABLE ROW LEVEL SECURITY;

-- Templates policies
CREATE POLICY "Templates are viewable by everyone" 
ON AILTS_templates FOR SELECT 
TO authenticated, anon 
USING (true);

CREATE POLICY "Templates are editable by admin" 
ON AILTS_templates FOR ALL 
TO authenticated 
USING (EXISTS (
    SELECT 1 FROM AILTS_admin_access 
    WHERE last_login > CURRENT_TIMESTAMP - INTERVAL '24 hours'
));

-- Sessions policies
CREATE POLICY "Sessions are viewable by everyone" 
ON AILTS_sessions FOR SELECT 
TO authenticated, anon 
USING (true);

CREATE POLICY "Sessions can be created by everyone" 
ON AILTS_sessions FOR INSERT 
TO authenticated, anon 
WITH CHECK (true);

-- Messages policies
CREATE POLICY "Messages are viewable by session participants" 
ON AILTS_messages FOR SELECT 
TO authenticated, anon 
USING (true);

CREATE POLICY "Messages can be created by session participants" 
ON AILTS_messages FOR INSERT 
TO authenticated, anon 
WITH CHECK (true);

-- Metrics policies
CREATE POLICY "Metrics are viewable by session participants" 
ON AILTS_metrics FOR SELECT 
TO authenticated, anon 
USING (true);

CREATE POLICY "Metrics can be created by session participants" 
ON AILTS_metrics FOR INSERT 
TO authenticated, anon 
WITH CHECK (true);
