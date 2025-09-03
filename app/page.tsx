/**
 * TricretParse MVP - Main Application Page
 * 
 * This is the main page component for the TricretParse MVP application.
 * It provides JSON conversion functionality with both basic and advanced AI-powered parsing,
 * along with a waitlist signup modal for users to join the beta program.
 * 
 * Features:
 * - Text to JSON conversion using AI
 * - Advanced conversational AI for complex parsing tasks
 * - Conversion history tracking
 * - Waitlist signup with Supabase integration
 * - Responsive design with modern UI components
 * 
 * @author TricretA
 * @version 1.0.0
 */
"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Zap, Settings, Copy, Sparkles, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"



/**
 * Main HomePage component for TricretParse MVP
 * 
 * This component serves as the primary interface for the JSON conversion tool,
 * providing both basic and advanced AI-powered parsing capabilities along with
 * user engagement features like waitlist signup.
 * 
 * @returns {JSX.Element} The rendered homepage component
 */
export default function HomePage() {
  // Input/Output state management
  const [inputText, setInputText] = useState("") // User's input text for conversion
  const [outputJson, setOutputJson] = useState("") // Generated JSON output
  
  // Loading states for different operations
  const [isLoading, setIsLoading] = useState(false) // Basic conversion loading
  const [isAdvancedLoading, setIsAdvancedLoading] = useState(false) // Advanced AI conversion loading
  

  
  // Waitlist form state
  const [email, setEmail] = useState("") // User email for waitlist
  const [tool, setTool] = useState("") // Selected tool preference
  const [isSubmitting, setIsSubmitting] = useState(false) // Waitlist submission loading
  
  const { toast } = useToast() // Toast notification hook

  /**
   * Handles basic text to JSON conversion using AI
   * 
   * This function sends the user's input text to the conversion API and processes
   * the response. It handles different response types including successful conversions
   * and requests for additional information from the AI.
   * 
   * @async
   * @function handleConvert
   * @returns {Promise<void>} Promise that resolves when conversion is complete
   */
  const handleConvert = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to convert.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setOutputJson("")

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "convert",
          inputText: inputText.trim(),
        }),
      })

      const result = await response.json()

      if (result.status === "need_info") {
        // AI is asking for more information
        const aiQuestion = result.questions?.[0] || "Could you provide more details?"
        setOutputJson(`AI Response: ${aiQuestion}

Please provide more details and try converting again.`)

        toast({
          title: "More Information Needed",
          description: "The AI needs more details to create your JSON.",
        })
      } else if (result.status === "ready" && result.json) {
        // Successful conversion
        setOutputJson(result.json)

        toast({
          title: "JSON Generated!",
          description: "Your text has been converted to JSON format.",
        })
      } else if (result.error) {
        setOutputJson(`Error: ${result.error}`)
        toast({
          title: "Conversion Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      setOutputJson("Error: Could not process your request. Please try again.")
      toast({
        title: "Connection Error",
        description: "Could not connect to the AI service.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handles advanced conversational AI-powered JSON conversion
   * 
   * This function provides more sophisticated parsing capabilities by maintaining
   * conversation context and allowing for iterative refinement of the JSON output
   * through AI dialogue.
   * 
   * @async
   * @function handleAdvancedConvert
   * @returns {Promise<void>} Promise that resolves when advanced conversion is complete
   */
  const handleAdvancedConvert = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to convert.",
        variant: "destructive",
      })
      return
    }

    setIsAdvancedLoading(true)
    setOutputJson("")

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "advanced",
          inputText: inputText.trim(),
        }),
      })

      const result = await response.json()

      if (result.status === "need_info") {
        // AI is asking for more information
        const aiQuestion = result.questions?.[0] || "Could you provide more details?"
        setOutputJson(`AI Response: ${aiQuestion}

Please provide more details and try converting again.`)

        toast({
          title: "More Information Needed",
          description: "The AI needs more details to create your advanced JSON.",
        })
      } else if (result.status === "ready" && result.json) {
        // Successful conversion
        setOutputJson(result.json)

        toast({
          title: "Advanced JSON Generated!",
          description: "Your text has been converted to comprehensive JSON format.",
        })
      } else if (result.error) {
        setOutputJson(`Error: ${result.error}`)
        toast({
          title: "Advanced Conversion Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      setOutputJson("Error: Could not process your advanced request. Please try again.")
      toast({
        title: "Connection Error",
        description: "Could not connect to the AI service.",
        variant: "destructive",
      })
    } finally {
      setIsAdvancedLoading(false)
    }
  }

  /**
   * Clears all input and output
   * 
   * Resets the application state to allow for a fresh conversion session.
   * 
   * @function handleClear
   * @returns {void}
   */
  const handleClear = () => {
    setInputText("")
    setOutputJson("")
  }

  /**
   * Copies the generated JSON output to the system clipboard
   * 
   * Uses the Clipboard API to copy the JSON output and shows a success toast.
   * Only copies if there is valid output to copy.
   * 
   * @async
   * @function handleCopyJson
   * @returns {Promise<void>} Promise that resolves when copy operation is complete
   */
  const handleCopyJson = async () => {
    if (outputJson) {
      await navigator.clipboard.writeText(outputJson)
      toast({
        title: "Copied!",
        description: "JSON copied to clipboard.",
      })
    }
  }



  /**
   * Handles waitlist signup form submission
   * 
   * This function processes the waitlist form submission by validating the input,
   * storing the user's email and tool preference in Supabase, and providing
   * appropriate feedback through toast notifications.
   * 
   * @async
   * @function handleWaitlistSubmit
   * @param {React.FormEvent} e - The form submission event
   * @returns {Promise<void>} Promise that resolves when submission is complete
   */
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim() || !tool || tool === "None") {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Only run Supabase code on client-side
      if (typeof window !== 'undefined') {
        const supabase = createClient()
        
        const { error } = await supabase
          .from("waitlist")
          .insert([
            {
              email: email.trim(),
              tool_interest: tool,
              created_at: new Date().toISOString(),
            },
          ])

        if (error) {
          toast({
            title: "Submission Failed",
            description: "There was an error joining the waitlist. Please try again.",
            variant: "destructive",
          })
          return
        }
      }

      toast({
        title: "Welcome to the Waitlist! 🎉",
        description: "You'll be notified when Vibe Coding Tools launch.",
      })

      setEmail("")
      setTool("")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error joining the waitlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-background">
      
      <header className="sticky top-0 z-50 glass border-b border-glass-border" role="banner">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary glow-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">TricretParse</h1>
              <Badge variant="secondary" className="glass hidden sm:inline-flex">
                Natural Prompt → JSON Prompt
              </Badge>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Badge variant="secondary" className="glass text-xs sm:text-sm">
                <span className="hidden sm:inline">#1 Free</span>
                <span className="sm:hidden">Free</span>
              </Badge>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 glow-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 h-8 rounded-md gap-1.5 px-3">
                    Get Free Vibe Coding Tools
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="glass glow-accent max-w-md">
                  <DialogHeader className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 glow-accent flex items-center justify-center">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <Badge variant="secondary" className="glass">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Coming Soon
                      </Badge>
                    </div>
                    <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                      Join the Vibe Coding Waitlist
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground max-w-md mx-auto">
                      Be first to access powerful tools that fix looping errors and unlock futuristic coding vibes for v0, Cursor,
                      Lovable, and more.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background/50 border-glass-border glow-primary"
                        disabled={isSubmitting}
                        required
                      />
                    </div>

                    <div>
                      <Select value={tool} onValueChange={setTool} disabled={isSubmitting}>
                        <SelectTrigger className="bg-background/50 border-glass-border glow-primary">
                          <SelectValue placeholder="Which tool are you most excited for?" />
                        </SelectTrigger>
                        <SelectContent className="glass border-glass-border">
                          <SelectItem value="None">
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 text-center">—</span>
                              None
                            </div>
                          </SelectItem>
                          <SelectItem value="Vibe Code Prompt Generator">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              Vibe Code Prompt Generator
                            </div>
                          </SelectItem>
                          <SelectItem value="Vibe Coding Prompt Optimizer/Rewriter">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              Vibe Coding Prompt Optimizer/Rewriter
                            </div>
                          </SelectItem>
                          <SelectItem value="Prebuilt Prompts to Fix Vide Code Error Loops">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              Prebuilt Prompts to Fix Vide Code Error Loops
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !email.trim() || !tool || tool === "None"}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 glow-accent"
                    >
                      {isSubmitting ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          Joining Waitlist...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Join Waitlist
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-center mt-4">
                    <p className="text-xs text-muted-foreground/80">
                      🚀 Get notified when we launch tools that make vibe coding effortless
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" role="main">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]" aria-label="JSON Conversion Tool">
          {/* Input Panel */}
          <article className="glass glow-primary p-6 flex flex-col" role="region" aria-labelledby="input-heading">
            <header className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-semibold text-foreground" id="input-heading">Natural Language Input</h1>
              <Badge variant="outline" className="glass">
                {inputText.length} chars
              </Badge>
            </header>

            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your request here... (e.g., 'My name is TricretA, make me a poster about fruit.')"
              className="flex-1 min-h-[200px] bg-background/50 border-glass-border resize-none"
              disabled={isLoading || isAdvancedLoading}
            />

            <div className="mt-2 mb-2">
              <p className="text-xs text-muted-foreground/80 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>💡 Tip: Add more details and descriptions to your prompt to get the best results</span>
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleConvert}
                disabled={!inputText.trim() || isLoading || isAdvancedLoading}
                className="flex-1 glow-primary"
              >
                {isLoading ? "Converting..." : "Convert to JSON"}
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={isLoading || isAdvancedLoading}>
                Clear
              </Button>
            </div>
          </article>

          {/* Output Panel */}
          <article className="glass glow-secondary p-6 flex flex-col" role="region" aria-labelledby="output-heading">
            <header className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground" id="output-heading">JSON Output</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopyJson} disabled={!outputJson}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAdvancedConvert}
                  disabled={!inputText.trim() || isLoading || isAdvancedLoading}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 glow-accent"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  {isAdvancedLoading ? "Processing..." : "Advanced JSON"}
                </Button>
              </div>
            </header>

            <div className="flex-1 bg-background/50 border border-glass-border rounded-lg p-4 overflow-auto" role="textbox" aria-readonly="true" aria-label="Generated JSON output">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                {outputJson || "JSON output will appear here..."}
              </pre>
            </div>
          </article>
        </section>
      </main>
      </div>
    </>
  )
}
