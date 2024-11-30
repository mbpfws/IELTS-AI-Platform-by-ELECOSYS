-- Create AILTS tables
CREATE TABLE IF NOT EXISTS AILTS_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('part1', 'part2', 'part3', 'tutoring')),
    title_en TEXT NOT NULL,
    title_vi TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_vi TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    topics TEXT[] NOT NULL,
    duration INTEGER NOT NULL,
    target_band NUMERIC(2,1) NOT NULL,
    system_prompt TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS AILTS_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    template_id UUID REFERENCES AILTS_templates(id),
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    duration INTEGER NOT NULL,
    metrics JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS AILTS_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES AILTS_sessions(id),
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    audio_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for audio recordings
INSERT INTO storage.buckets (id, name)
VALUES ('ielts-recordings', 'ielts-recordings')
ON CONFLICT DO NOTHING;

-- Set up RLS policies
ALTER TABLE AILTS_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE AILTS_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE AILTS_messages ENABLE ROW LEVEL SECURITY;

-- Templates policies (admin only for write)
CREATE POLICY "Enable read access for all users" ON AILTS_templates
    FOR SELECT USING (true);

CREATE POLICY "Enable write access for authenticated users only" ON AILTS_templates
    FOR ALL USING (auth.role() = 'authenticated');

-- Sessions policies
CREATE POLICY "Users can view their own sessions" ON AILTS_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions" ON AILTS_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" ON AILTS_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view messages from their sessions" ON AILTS_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM AILTS_sessions s
            WHERE s.id = AILTS_messages.session_id
            AND s.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create messages in their sessions" ON AILTS_messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM AILTS_sessions s
            WHERE s.id = AILTS_messages.session_id
            AND s.user_id = auth.uid()
        )
    );

-- Storage policies
CREATE POLICY "Users can upload their own recordings" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'ielts-recordings' AND
        auth.uid() = (SELECT user_id FROM AILTS_sessions WHERE id::text = (regexp_split_to_array(path, '/')[1])::uuid)
    );

CREATE POLICY "Users can view their own recordings" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'ielts-recordings' AND
        auth.uid() = (SELECT user_id FROM AILTS_sessions WHERE id::text = (regexp_split_to_array(path, '/')[1])::uuid)
    );
