import type { Schema } from "./schema" // Assuming Schema is defined in a separate file

export interface ConversionResult {
  success: boolean
  json: string
  error?: string
  tokensUsed?: number
}

export interface ConversationResult {
  status: "need_info" | "ready"
  questions?: string[]
  json?: string
  error?: string
  tokensUsed?: number
}

export interface SchemaDetectionResult {
  status: "need_info" | "ready"
  questions?: string[]
  matches: Array<{ schema: Schema; confidence: number }>
  selectedSchema?: Schema
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type?: "message" | "questions" | "schema_selection"
  questions?: string[]
  schemaMatches?: Array<{ schema: Schema; confidence: number }>
}

export interface ConversationState {
  messages: ChatMessage[]
  currentSchema?: Schema
  isProcessing: boolean
  conversationComplete: boolean
  finalJson?: string
}
