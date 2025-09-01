"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import type { Message } from '@/types/chat';

import { cn } from "@/lib/utils"

interface ChatMessagesProps {
  sections: Array<{
    id: string
    userMessage: Message
    assistantMessages: Message[]
  }>
  data?: any[]
  onQuerySelect: (query: string) => void
  isLoading: boolean
  chatId: string
  addToolResult: (result: { toolCallId: string; result: any }) => void
  scrollContainerRef: React.RefObject<HTMLDivElement>
  onUpdateMessage: (messageId: string, newContent: string) => void
  reload: (messageId: string, options?: any) => Promise<any>
}

export function ChatMessages({
  sections,
  data,
  onQuerySelect,
  isLoading,
  chatId,
  addToolResult,
  scrollContainerRef,
  onUpdateMessage,
  reload,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [sections])

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-6"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      {sections.map((section) => (
        <div
          key={section.id}
          id={`section-${section.id}`}
          className={cn("space-y-4")}
        >
          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs md:max-w-md lg:max-w-lg">
              {section.userMessage.content}
            </div>
          </div>

          {/* Assistant messages */}
          {section.assistantMessages.map((message) => (
            <div key={message.id} className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs md:max-w-md lg:max-w-lg">
                {message.content}
              </div>
            </div>
          ))}
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}
