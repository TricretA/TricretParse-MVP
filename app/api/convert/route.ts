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
 *   "inputText": "John Doe, age 30, works at TechCorp"
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
    // Security: Validate request body exists and is valid JSON
    const body = await req.json()
    
    // Security: Input validation and sanitization
    const { type, inputText, invalidJSON, validationErrors, message } = body
    
    // Security: Validate required fields and prevent injection
    if (!type || typeof type !== 'string') {
      return NextResponse.json({ success: false, error: "Invalid or missing request type" })
    }
    
    // Security: Limit input text length to prevent abuse
    const maxInputLength = 10000
    if (inputText && typeof inputText === 'string' && inputText.length > maxInputLength) {
      return NextResponse.json({ success: false, error: "Input text too long" })
    }
    
    if (message && typeof message === 'string' && message.length > maxInputLength) {
      return NextResponse.json({ success: false, error: "Message too long" })
    }

    if (type === "convert" || type === "conversation") {
      const userMessage = message || inputText
      const result = await convertToJSON(userMessage, [])
      return NextResponse.json(result)
    }

    if (type === "advanced") {
      const userMessage = message || inputText
      const result = await convertToAdvancedJSON(userMessage, [])
      return NextResponse.json(result)
    }

    if (type === "repair") {
      const result = await repairJSON(invalidJSON, validationErrors)
      return NextResponse.json(result)
    }

    if (type === "detectSchema") {
      const result = await autoDetectSchema(inputText, [])
      return NextResponse.json(result)
    }

    return NextResponse.json({ success: false, error: "Invalid request type" })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Server error",
    })
  }
}
