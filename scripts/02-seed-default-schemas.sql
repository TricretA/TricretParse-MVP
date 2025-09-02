-- Insert default organization
insert into orgs (id, name, plan) 
values ('00000000-0000-0000-0000-000000000000', 'Default Organization', 'free')
on conflict (id) do nothing;

-- Insert default schemas
insert into schemas (org_id, name, json_schema, instructions, is_default) values
(
  '00000000-0000-0000-0000-000000000000',
  'Blog Post',
  '{
    "type": "object",
    "properties": {
      "title": {"type": "string", "description": "The blog post title"},
      "author": {"type": "string", "description": "Author name"},
      "content": {"type": "string", "description": "Main blog content"},
      "tags": {"type": "array", "items": {"type": "string"}, "description": "Content tags"},
      "publishDate": {"type": "string", "format": "date", "description": "Publication date"},
      "category": {"type": "string", "description": "Blog category"}
    },
    "required": ["title", "author", "content", "tags", "publishDate", "category"]
  }',
  'Convert natural language into a structured blog post with title, author, content, tags, publication date, and category.',
  true
),
(
  '00000000-0000-0000-0000-000000000000',
  'Ad Copy',
  '{
    "type": "object",
    "properties": {
      "headline": {"type": "string", "description": "Main advertising headline"},
      "subheadline": {"type": "string", "description": "Supporting subheadline"},
      "bodyText": {"type": "string", "description": "Main ad copy text"},
      "callToAction": {"type": "string", "description": "Call to action text"},
      "targetAudience": {"type": "string", "description": "Target demographic"},
      "tone": {"type": "string", "enum": ["professional", "casual", "urgent", "friendly"], "description": "Tone of voice"}
    },
    "required": ["headline", "subheadline", "bodyText", "callToAction", "targetAudience", "tone"]
  }',
  'Transform marketing requests into structured ad copy with headlines, body text, call-to-action, and audience targeting.',
  true
),
(
  '00000000-0000-0000-0000-000000000000',
  'Support Ticket',
  '{
    "type": "object",
    "properties": {
      "title": {"type": "string", "description": "Issue title"},
      "description": {"type": "string", "description": "Detailed issue description"},
      "priority": {"type": "string", "enum": ["low", "medium", "high", "urgent"], "description": "Issue priority"},
      "category": {"type": "string", "description": "Issue category"},
      "customerInfo": {"type": "object", "properties": {"name": {"type": "string"}, "email": {"type": "string"}}, "description": "Customer information"},
      "expectedResolution": {"type": "string", "description": "Expected resolution timeframe"}
    },
    "required": ["title", "description", "priority", "category", "customerInfo", "expectedResolution"]
  }',
  'Convert support requests into structured tickets with priority, category, customer info, and resolution expectations.',
  true
)
on conflict do nothing;
