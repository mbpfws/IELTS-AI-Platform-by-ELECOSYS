-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- Grant necessary permissions
grant usage on schema public to postgres, anon, authenticated, service_role;
grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role;

-- Create AILTS tables
create or replace function create_ailts_tables()
returns void
language plpgsql
as $$
begin
  -- Create templates table
  create table if not exists ailts_templates (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    title_vi text not null,
    title_en text not null,
    description text not null,
    description_vi text not null,
    description_en text not null,
    part integer not null check (part in (1, 2, 3)),
    difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
    task_type text not null check (task_type in ('task1', 'task2', 'lesson')),
    system_prompt text,
    category text not null,
    level text not null,
    target_band numeric(2,1) not null check (target_band between 0.0 and 9.0),
    duration integer not null default 5,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create template questions table
  create table if not exists ailts_template_questions (
    id uuid primary key default uuid_generate_v4(),
    template_id uuid references ailts_templates(id) on delete cascade,
    question text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create template topics table
  create table if not exists ailts_template_topics (
    id uuid primary key default uuid_generate_v4(),
    template_id uuid references ailts_templates(id) on delete cascade,
    topic text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create template objectives table
  create table if not exists ailts_template_objectives (
    id uuid primary key default uuid_generate_v4(),
    template_id uuid references ailts_templates(id) on delete cascade,
    objective text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create template criteria table
  create table if not exists ailts_template_criteria (
    id uuid primary key default uuid_generate_v4(),
    template_id uuid references ailts_templates(id) on delete cascade,
    criterion text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create sessions table
  create table if not exists ailts_sessions (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null,
    template_id uuid references ailts_templates(id) on delete set null,
    start_time timestamp with time zone default timezone('utc'::text, now()) not null,
    end_time timestamp with time zone,
    duration integer not null default 5,
    status text not null check (status in ('active', 'completed', 'cancelled')),
    metrics jsonb not null default '{
      "fluency": 0,
      "lexical": 0,
      "grammar": 0,
      "pronunciation": 0,
      "coherence": 0
    }'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create messages table
  create table if not exists ailts_messages (
    id uuid primary key default uuid_generate_v4(),
    session_id uuid references ailts_sessions(id) on delete cascade,
    role text not null check (role in ('user', 'assistant')),
    content text not null,
    audio_url text,
    timestamp bigint not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create feedback table
  create table if not exists ailts_feedback (
    id uuid primary key default uuid_generate_v4(),
    session_id uuid references ailts_sessions(id) on delete cascade,
    content text not null,
    strengths text[] not null default array[]::text[],
    weaknesses text[] not null default array[]::text[],
    suggestions text[] not null default array[]::text[],
    metrics jsonb not null default '{
      "fluency": 0,
      "lexical": 0,
      "grammar": 0,
      "pronunciation": 0,
      "coherence": 0
    }'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create metrics table for historical tracking
  create table if not exists ailts_metrics (
    id uuid primary key default uuid_generate_v4(),
    session_id uuid references ailts_sessions(id) on delete cascade,
    metrics jsonb not null default '{
      "fluency": 0,
      "lexical": 0,
      "grammar": 0,
      "pronunciation": 0,
      "coherence": 0
    }'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create recordings table
  create table if not exists ailts_recordings (
    id uuid primary key default uuid_generate_v4(),
    session_id uuid references ailts_sessions(id) on delete cascade,
    file_path text not null,
    public_url text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create indexes for better performance
  create index if not exists idx_ailts_template_questions_template_id on ailts_template_questions(template_id);
  create index if not exists idx_ailts_template_topics_template_id on ailts_template_topics(template_id);
  create index if not exists idx_ailts_template_objectives_template_id on ailts_template_objectives(template_id);
  create index if not exists idx_ailts_template_criteria_template_id on ailts_template_criteria(template_id);
  create index if not exists idx_ailts_messages_session_id on ailts_messages(session_id);
  create index if not exists idx_ailts_feedback_session_id on ailts_feedback(session_id);
  create index if not exists idx_ailts_metrics_session_id on ailts_metrics(session_id);
  create index if not exists idx_ailts_recordings_session_id on ailts_recordings(session_id);

  -- Grant permissions on newly created tables
  grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;
  grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role;
end;
$$;

-- Execute the function to create tables
select create_ailts_tables();
