-- Create AILTS template categories
CREATE TYPE template_category AS ENUM ('part1', 'part2', 'part3', 'advanced', 'tutoring');

-- Create AILTS templates table
CREATE TABLE IF NOT EXISTS AILTS_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category template_category NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
    duration INTEGER NOT NULL DEFAULT 900, -- in seconds
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create AILTS template questions table
CREATE TABLE IF NOT EXISTS AILTS_template_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID REFERENCES AILTS_templates(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    suggested_answer TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create AILTS template topics table
CREATE TABLE IF NOT EXISTS AILTS_template_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID REFERENCES AILTS_templates(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create AILTS template vocabulary table
CREATE TABLE IF NOT EXISTS AILTS_template_vocabulary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID REFERENCES AILTS_templates(id) ON DELETE CASCADE,
    word TEXT NOT NULL,
    definition TEXT NOT NULL,
    example TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_ailts_templates_category ON AILTS_templates(category);
CREATE INDEX IF NOT EXISTS idx_ailts_template_questions_template_id ON AILTS_template_questions(template_id);
CREATE INDEX IF NOT EXISTS idx_ailts_template_topics_template_id ON AILTS_template_topics(template_id);
CREATE INDEX IF NOT EXISTS idx_ailts_template_vocabulary_template_id ON AILTS_template_vocabulary(template_id);

-- Add triggers for updated_at
CREATE TRIGGER update_ailts_templates_updated_at
    BEFORE UPDATE ON AILTS_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ailts_template_questions_updated_at
    BEFORE UPDATE ON AILTS_template_questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
