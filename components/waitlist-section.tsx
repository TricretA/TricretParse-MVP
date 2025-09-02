"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Zap, Sparkles, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WaitlistSection() {
  const [email, setEmail] = useState("")
  const [tool, setTool] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !tool || tool === "None") {
      toast({
        title: "Missing Information",
        description: "Please enter your email and select a tool.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Use the pre-configured Supabase client
      const { supabase, isSupabaseConfigured } = await import("@/lib/supabase/client")
      
      if (!isSupabaseConfigured || !supabase) {
        toast({
          title: "Configuration Error",
          description: "Supabase is not properly configured. Please check your environment variables.",
          variant: "destructive",
        })
        return
      }

      const { error } = await supabase.from("waitlist").insert([{ email: email.trim(), tool }])

      if (error) {
        console.error("Waitlist error:", error)
        if (error.code === "23505" || error.message.includes("duplicate") || error.message.includes("unique")) {
          toast({
            title: "Already on the waitlist!",
            description: "This email is already registered. We'll notify you when your tool is ready.",
          })
        } else {
          toast({
            title: "Something went wrong",
            description: "Please try again later.",
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "✅ You're on the waitlist!",
          description: "We'll notify you when your tool is ready.",
        })
        setEmail("")
        setTool("")
      }
    } catch (error) {
      console.error("Waitlist submission error:", error)
      toast({
        title: "Connection Error",
        description: "Could not submit your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 glow-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
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

        <form onSubmit={handleSubmit} className="space-y-4">
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
  )
}
