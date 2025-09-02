import { supabase } from "./supabase/client"
import type { Schema, Conversion } from "./supabase/client"

export async function getSchemas(): Promise<Schema[]> {
  try {
    const { data, error } = await supabase
      .from("schemas")
      .select("*")
      .order("is_default", { ascending: false })
      .order("name")

    if (error) {
      return []
    }

    return data || []
  } catch (error) {
    return []
  }
}

export async function saveConversion(
  schemaId: string | null,
  inputText: string,
  outputJson: any,
  score?: number,
  costMs?: number,
  tokensUsed?: number,
): Promise<Conversion | null> {
  try {
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
      return null
    }

    return data
  } catch (error) {
    return null
  }
}

export async function getConversions(limit = 5): Promise<Conversion[]> {
  try {
    const { data, error } = await supabase
      .from("conversions")
      .select(`
        *,
        schemas (name)
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      return []
    }

    return data || []
  } catch (error) {
    return []
  }
}
