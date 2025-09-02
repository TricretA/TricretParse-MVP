"use client"

import { Button } from "@/components/ui/button"
import { Copy, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

interface JsonResultPanelProps {
  json: string
  isValid: boolean
  validationErrors?: string[]
  onRepair?: () => void
  onStartNew?: () => void
}

export function JsonResultPanel({ json, isValid, validationErrors, onRepair, onStartNew }: JsonResultPanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-graphite-600/30">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-graphite-100">Generated JSON</h2>
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
              isValid
                ? "bg-green-400/10 text-green-400 border border-green-400/20"
                : "bg-red-400/10 text-red-400 border border-red-400/20"
            }`}
          >
            {isValid ? (
              <>
                <CheckCircle className="w-3 h-3" />
                Valid
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                Invalid
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="bg-graphite-700/30 border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-400/5 text-graphite-200"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? "Copied!" : "Copy"}
          </Button>

          {!isValid && onRepair && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRepair}
              className="bg-red-400/10 border-red-400/20 hover:border-red-400/40 hover:bg-red-400/5 text-red-400"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Repair
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onStartNew}
            className="bg-graphite-700/30 border-graphite-600/30 hover:border-graphite-500/40 hover:bg-graphite-600/20 text-graphite-200"
          >
            Start New
          </Button>
        </div>
      </div>

      {/* JSON Display */}
      <div className="flex-1 p-4">
        <div className="h-full bg-graphite-900/50 border border-graphite-600/30 rounded-lg overflow-hidden">
          <pre className="h-full overflow-auto p-4 text-sm font-mono text-graphite-100 leading-relaxed">{json}</pre>
        </div>

        {/* Validation Errors */}
        {!isValid && validationErrors && validationErrors.length > 0 && (
          <div className="mt-4 p-4 bg-red-400/5 border border-red-400/20 rounded-lg">
            <h4 className="text-sm font-medium text-red-400 mb-2">Validation Errors:</h4>
            <ul className="space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-xs text-red-300">
                  • {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
