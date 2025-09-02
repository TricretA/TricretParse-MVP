export interface SchemaDefinition {
  id: string
  name: string
  structure: Record<string, string>
  jsonSchema: object
}

export const SCHEMAS: SchemaDefinition[] = [
  {
    id: "blog-post",
    name: "Blog Post",
    structure: {
      title: "string",
      content: "string",
      author: "string",
      publishDate: "date",
      tags: "array<string>",
      featured: "boolean",
    },
    jsonSchema: {
      type: "object",
      properties: {
        title: { type: "string", minLength: 1 },
        content: { type: "string", minLength: 10 },
        author: { type: "string", minLength: 1 },
        publishDate: { type: "string", format: "date-time" },
        tags: { type: "array", items: { type: "string" } },
        featured: { type: "boolean" },
      },
      required: ["title", "content", "author", "publishDate"],
      additionalProperties: false,
    },
  },
  {
    id: "ad-copy",
    name: "Ad Copy",
    structure: {
      headline: "string",
      description: "string",
      callToAction: "string",
      targetAudience: "string",
      platform: "string",
    },
    jsonSchema: {
      type: "object",
      properties: {
        headline: { type: "string", minLength: 1, maxLength: 100 },
        description: { type: "string", minLength: 10, maxLength: 500 },
        callToAction: { type: "string", minLength: 1, maxLength: 50 },
        targetAudience: { type: "string", minLength: 1 },
        platform: { type: "string", enum: ["facebook", "google", "instagram", "linkedin", "twitter"] },
      },
      required: ["headline", "description", "callToAction", "targetAudience", "platform"],
      additionalProperties: false,
    },
  },
  {
    id: "support-ticket",
    name: "Support Ticket",
    structure: {
      subject: "string",
      description: "string",
      priority: "enum[low,medium,high,urgent]",
      category: "string",
      customerEmail: "email",
      status: "enum[open,in-progress,resolved,closed]",
    },
    jsonSchema: {
      type: "object",
      properties: {
        subject: { type: "string", minLength: 1, maxLength: 200 },
        description: { type: "string", minLength: 10 },
        priority: { type: "string", enum: ["low", "medium", "high", "urgent"] },
        category: { type: "string", minLength: 1 },
        customerEmail: { type: "string", format: "email" },
        status: { type: "string", enum: ["open", "in-progress", "resolved", "closed"] },
      },
      required: ["subject", "description", "priority", "category", "customerEmail"],
      additionalProperties: false,
    },
  },
]

export function getSchemaById(id: string): SchemaDefinition | undefined {
  return SCHEMAS.find((schema) => schema.id === id)
}
