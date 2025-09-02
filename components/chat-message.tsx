"use client"

import type { ChatMessage } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Copy, Bot, User } from "lucide-react"
import { useState } from "react"

interface ChatMessageProps {
  message: ChatMessage
  onQuestionResponse?: (response: string) => void
  onSchemaSelect?: (schemaId: string) => void
}

export function ChatMessageComponent({ message, onQuestionResponse, onSchemaSelect }: ChatMessageProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string>("")
  const [customResponse, setCustomResponse] = useState("")

  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-600/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center">
          <Bot className="w-4 h-4 text-cyan-400" />
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`
            p-4 rounded-2xl backdrop-blur-md border
            ${
              isUser
                ? "bg-gradient-to-br from-cyan-400/10 to-violet-600/10 border-cyan-400/30 text-cyan-100"
                : "bg-graphite-800/40 border-graphite-600/30 text-graphite-100"
            }
          `}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>

          {/* Questions Section */}
          {message.questions && message.questions.length > 0 && (
            <div className="mt-4 space-y-3">
              <p className="text-xs text-cyan-400 font-medium">Please help me understand:</p>
              <div className="space-y-2">
                {message.questions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-3 bg-graphite-700/30 border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-400/5 text-graphite-200 hover:text-cyan-100"
                    onClick={() => onQuestionResponse?.(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>

              {/* Custom Response Input */}
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Or type your own response..."
                  value={customResponse}
                  onChange={(e) => setCustomResponse(e.target.value)}
                  className="w-full p-3 bg-graphite-800/50 border border-graphite-600/30 rounded-lg text-sm text-graphite-100 placeholder-graphite-400 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customResponse.trim()) {
                      onQuestionResponse?.(customResponse)
                      setCustomResponse("")
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Schema Selection */}
          {message.schemaMatches && message.schemaMatches.length > 0 && (
            <div className="mt-4 space-y-3">
              <p className="text-xs text-cyan-400 font-medium">Suggested schemas:</p>
              <div className="space-y-2">
                {message.schemaMatches.map((match, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-between h-auto p-3 bg-graphite-700/30 border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-400/5 text-graphite-200 hover:text-cyan-100"
                    onClick={() => onSchemaSelect?.(match.schema.id)}
                  >
                    <span>{match.schema.name}</span>
                    <span className="text-xs text-cyan-400">{Math.round(match.confidence * 100)}% match</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2 text-xs text-graphite-400">
          <span>{message.timestamp.toLocaleTimeString()}</span>
          {!isUser && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-graphite-400 hover:text-cyan-400"
              onClick={() => navigator.clipboard.writeText(message.content)}
            >
              <Copy className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-600/20 backdrop-blur-sm border border-violet-400/30 flex items-center justify-center">
          <User className="w-4 h-4 text-violet-400" />
        </div>
      )}
    </div>
  )
}
