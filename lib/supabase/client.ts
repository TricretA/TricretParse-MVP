/**
 * Supabase Client Configuration
 * 
 * This module handles the creation and configuration of the Supabase client
 * for the TricretParse MVP application. It includes environment variable
 * validation, error handling, and type definitions for database entities.
 * 
 * @author TricretA
 * @version 1.0.0
 */
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Validates if a given string is a valid URL format
 * 
 * @function isValidUrl
 * @param {string} url - The URL string to validate
 * @returns {boolean} True if the URL is valid, false otherwise
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Environment variable extraction with fallback support
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

/**
 * Validates if Supabase is properly configured with valid environment variables
 * 
 * Checks for:
 * - Valid URL format
 * - Non-placeholder values
 * - Non-empty strings
 * - Proper anonymous key format
 * 
 * @constant {boolean} isSupabaseConfigured
 */
export const isSupabaseConfigured =
  typeof supabaseUrl === "string" &&
  supabaseUrl.length > 0 &&
  !supabaseUrl.includes("your_supabase_project_url_here") &&
  !supabaseUrl.includes("your-project-id") &&
  isValidUrl(supabaseUrl) &&
  typeof supabaseAnonKey === "string" &&
  supabaseAnonKey.length > 0 &&
  !supabaseAnonKey.includes("your_supabase_anon_key")

/**
 * Supabase client instance with error handling
 * 
 * Creates a Supabase client only if the configuration is valid.
 * Returns null if configuration is invalid or client creation fails.
 * 
 * @type {ReturnType<typeof createClient> | null}
 */
let supabase: ReturnType<typeof createSupabaseClient> | null = null

if (isSupabaseConfigured && supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    supabase = null
  }
}

// Export the safely created client
export { supabase }

/**
 * Database Type Definitions
 * 
 * TypeScript interfaces for all database entities used in the application.
 * These interfaces ensure type safety when working with Supabase data.
 */

/**
 * Organization entity interface
 * 
 * @interface Organization
 * @property {string} id - Unique organization identifier
 * @property {string} name - Organization name
 * @property {string} plan - Subscription plan type
 * @property {string} created_at - ISO timestamp of creation
 */
export interface Organization {
  id: string
  name: string
  plan: string
  created_at: string
}

/**
 * User entity interface
 * 
 * @interface User
 * @property {string} id - Unique user identifier
 * @property {string} org_id - Associated organization ID
 * @property {string} email - User email address
 * @property {string} role - User role within organization
 * @property {string} created_at - ISO timestamp of creation
 */
export interface User {
  id: string
  org_id: string
  email: string
  role: string
  created_at: string
}

/**
 * Schema entity interface
 * 
 * @interface Schema
 * @property {string} id - Unique schema identifier
 * @property {string} org_id - Associated organization ID
 * @property {string} name - Schema name
 * @property {any} json_schema - JSON schema definition
 * @property {string | null} instructions - Optional parsing instructions
 * @property {string} version - Schema version
 * @property {boolean} is_default - Whether this is the default schema
 * @property {string} created_at - ISO timestamp of creation
 */
export interface Schema {
  id: string
  org_id: string
  name: string
  json_schema: any
  instructions: string | null
  version: string
  is_default: boolean
  created_at: string
}

/**
 * Conversion entity interface
 * 
 * @interface Conversion
 * @property {string} id - Unique conversion identifier
 * @property {string} org_id - Associated organization ID
 * @property {string | null} schema_id - Optional schema used for conversion
 * @property {string} input_text - Original input text
 * @property {any} output_json - Generated JSON output
 * @property {number | null} score - Optional quality score
 * @property {number | null} cost_ms - Processing time in milliseconds
 * @property {number | null} tokens_used - AI tokens consumed
 * @property {string} created_at - ISO timestamp of creation
 */
export interface Conversion {
  id: string
  org_id: string
  schema_id: string | null
  input_text: string
  output_json: any
  score: number | null
  cost_ms: number | null
  tokens_used: number | null
  created_at: string
}

/**
 * Factory function to create a new Supabase client instance
 * 
 * This function provides a safe way to create Supabase clients with proper
 * error handling and configuration validation. It should be used instead of
 * directly accessing the exported supabase instance when you need a fresh client.
 * 
 * @function createClient
 * @returns {ReturnType<typeof createSupabaseClient> | null} A new Supabase client or null if configuration is invalid
 * @throws {Error} Throws an error if client creation fails
 * 
 * @example
 * ```typescript
 * const client = createClient()
 * if (client) {
 *   const { data, error } = await client.from('waitlist').select('*')
 * }
 * ```
 */
export function createClient() {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) {
    return null
  }

  try {
     return createSupabaseClient(supabaseUrl, supabaseAnonKey)
   } catch (error) {
     throw error
   }
}
