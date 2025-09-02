-- Organizations
create table if not exists orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text default 'free',
  created_at timestamptz default now()
);

-- Users
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  email text unique not null,
  role text default 'member',
  created_at timestamptz default now()
);

-- Schemas
create table if not exists schemas (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  name text not null,
  json_schema jsonb not null,
  instructions text,
  version text default '1.0',
  is_default boolean default false,
  created_at timestamptz default now()
);

-- Conversions
create table if not exists conversions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  schema_id uuid references schemas(id) on delete set null,
  input_text text not null,
  output_json jsonb not null,
  score numeric,
  cost_ms integer,
  tokens_used integer,
  created_at timestamptz default now()
);
