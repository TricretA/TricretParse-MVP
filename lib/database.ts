import { supabase } from "./supabase/client"
import type { Schema, Conversion } from "./supabase/client"

export async function getSchemas(): Promise<Schema[]> {
  const { data, error } = await supabase
    .from("schemas")
    .select("*")
    .order("is_default", { ascending: false })
    .order("name")

  if (error) {
    console.error("Error fetching schemas:", error)
    return []
  }

  return data || []
}

export async function saveConversion(
  schemaId: string | null,
  inputText: string,
  outputJson: any,
  score?: number,
  costMs?: number,
  tokensUsed?: number,
): Promise<Conversion | null> {
  const { data, error } = await supabase
    .from("conversions")
    .insert({
      org_id: "00000000-0000-0000-0000-000000000000", // Default org for now
      schema_id: schemaId,
      input_text: inputText,
      output_json: outputJson,
      score,
      cost_ms: costMs,
      tokens_used: tokensUsed,
    })
    .select()
    .single()

  if (error) {
    console.error("Error saving conversion:", error)
    return null
  }

  return data
}

export async function getConversions(limit = 5): Promise<Conversion[]> {
  const { data, error } = await supabase
    .from("conversions")
    .select(`
      *,
      schemas (name)
    `)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching conversions:", error)
    return []
  }

  return data || []
}
