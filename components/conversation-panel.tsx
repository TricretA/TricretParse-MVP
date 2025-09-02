"use client"

import type React from "react"

import type { ConversationState } from "@/lib/types"
import { ChatMessageComponent } from "./chat-message"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface ConversationPanelProps {
  conversation: ConversationState
  onSendMessage: (message: string) => void
  onQuestionResponse: (response: string) => void
  onSchemaSelect: (schemaId: string) => void
}

export function ConversationPanel({
  conversation,
  onSendMessage,
  onQuestionResponse,
  onSchemaSelect,
}: ConversationPanelProps) {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation.messages])

  // Focus input when not processing
  useEffect(() => {
    if (!conversation.isProcessing) {
      inputRef.current?.focus()
    }
  }, [conversation.isProcessing])

  const handleSend = () => {
    if (inputValue.trim() && !conversation.isProcessing) {
      onSendMessage(inputValue.trim())
      setInputValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {conversation.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-600/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center">
                <Send className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-graphite-100">Start a Conversation</h3>
              <p className="text-sm text-graphite-400 max-w-md">
                Tell me what kind of content you'd like to create, and I'll help you build the perfect JSON structure
                through our conversation.
              </p>
            </div>
          </div>
        ) : (
          <>
            {conversation.messages.map((message) => (
              <ChatMessageComponent
                key={message.id}
                message={message}
                onQuestionResponse={onQuestionResponse}
                onSchemaSelect={onSchemaSelect}
              />
            ))}

            {/* Processing Indicator */}
            {conversation.isProcessing && (
              <div className="flex gap-3 mb-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-600/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                </div>
                <div className="max-w-[80%]">
                  <div className="p-4 rounded-2xl backdrop-blur-md border bg-graphite-800/40 border-graphite-600/30">
                    <div className="flex items-center gap-2 text-sm text-graphite-300">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      {!conversation.conversationComplete && (
        <div className="border-t border-graphite-600/30 p-4">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={conversation.isProcessing}
              className="flex-1 p-3 bg-graphite-800/50 border border-graphite-600/30 rounded-lg text-sm text-graphite-100 placeholder-graphite-400 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 disabled:opacity-50"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || conversation.isProcessing}
              className="px-4 py-3 bg-gradient-to-r from-cyan-400 to-violet-600 hover:from-cyan-300 hover:to-violet-500 text-white border-0 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {conversation.isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
