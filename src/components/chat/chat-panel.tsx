
"use client"

import type React from "react"
import { useState } from "react"
import type { Message } from "ai/react"
import { Send, StopCircle } from "lucide-react"

import type { Model } from "@/lib/types/models"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export interface ChatPanelProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  messages: Message[]
  setMessages: (messages: Message[]) => void
  stop: () => void
  query?: string
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ input, handleInputChange, handleSubmit, isLoading, messages, setMessages, stop, query }) => {
  return (
    <div>
      {/* Your component JSX here */}
    </div>
  )
}


