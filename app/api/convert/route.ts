/**
 * API Route: /api/convert
 * 
 * This API endpoint handles various JSON conversion operations using AI services.
 * It supports multiple conversion types including basic text-to-JSON, advanced
 * conversational parsing, JSON repair, and schema detection.
 * 
 * @author TricretA
 * @version 1.0.0
 */
import { NextResponse } from "next/server"
import { convertToJSON, convertToAdvancedJSON, repairJSON, autoDetectSchema } from "@/lib/ai-service"

/**
 * POST handler for JSON conversion operations
 * 
 * Processes different types of conversion requests:
 * - 'convert' or 'conversation': Basic text-to-JSON conversion
 * - 'advanced': Advanced conversational AI parsing
 * - 'repair': JSON validation and repair
 * - 'detectSchema': Automatic schema detection
 * 
 * @async
 * @function POST
 * @param {Request} req - The incoming HTTP request
 * @returns {Promise<NextResponse>} JSON response with conversion results
 * 
 * @example
 * Request body for basic conversion:
 * ```json
 * {
 *   "type": "convert",
 *   "inputText": "John Doe, age 30, works at TechCorp",
 *   "conversationHistory": []
 * }
 * ```
 * 
 * @example
 * Response for successful conversion:
 * ```json
 * {
 *   "status": "ready",
 *   "json": "{\"name\": \"John Doe\", \"age\": 30, \"company\": \"TechCorp\"}"
 * }
 * ```
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("API Route - Request body:", body)

    const { type, inputText, invalidJSON, validationErrors, conversationHistory, message } = body

    if (type === "convert" || type === "conversation") {
      console.log("API Route - Processing basic natural language conversion")

      const userMessage = message || inputText
      const result = await convertToJSON(userMessage, conversationHistory)

      console.log("API Route - Basic conversion result:", { status: result.status, hasJson: !!result.json })
      return NextResponse.json(result)
    }

    if (type === "advanced") {
      console.log("API Route - Processing advanced natural language conversion")

      const userMessage = message || inputText
      const result = await convertToAdvancedJSON(userMessage, conversationHistory)

      console.log("API Route - Advanced conversion result:", { status: result.status, hasJson: !!result.json })
      return NextResponse.json(result)
    }

    if (type === "repair") {
      console.log("API Route - Repairing JSON")
      const result = await repairJSON(invalidJSON, validationErrors)
      return NextResponse.json(result)
    }

    if (type === "detectSchema") {
      console.log("API Route - Schema detection (simplified)")
      const result = await autoDetectSchema(inputText, [])
      return NextResponse.json(result)
    }

    console.error("API Route - Invalid request type:", type)
    return NextResponse.json({ success: false, error: "Invalid request type" })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Server error",
    })
  }
}
