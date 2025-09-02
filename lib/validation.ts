import Ajv from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateJSON(jsonString: string, schema: object): ValidationResult {
  try {
    const data = JSON.parse(jsonString)
    const validate = ajv.compile(schema)
    const isValid = validate(data)

    if (isValid) {
      return { isValid: true, errors: [] }
    }

    const errors = validate.errors?.map((error) => {
      const path = error.instancePath || "root"
      return `${path}: ${error.message}`
    }) || ["Unknown validation error"]

    return { isValid: false, errors }
  } catch (error) {
    return { isValid: false, errors: ["Invalid JSON format"] }
  }
}

export function isValidJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString)
    return true
  } catch {
    return false
  }
}
