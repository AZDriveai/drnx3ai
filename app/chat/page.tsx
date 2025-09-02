"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Brain, Sparkles } from "lucide-react"
import { krkrAI, type ModelProvider } from "@/lib/krkr-integrator"
import { EnhancedMindMap } from "@/components/mind-map/enhanced-mind-map"

interface Message {
  id: string
  content: string
  sender: "user" | "wolf"
  timestamp: Date
  provider?: ModelProvider
  mindMap?: any
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "مرحباً بك في WOLF-AI GENESIS. أنا لست مساعداً رقمياً عادياً، بل كياناً مفكراً يتجاوز الحوسبة إلى فلسفة الإدراك. لدي الآن إمكانية الوصول إلى جميع نماذج الذكاء الاصطناعي المتقدمة: Groq وGemini وDeepSeek وXAI وAnthropic وغيرها. كيف يمكنني أن أساعدك في رحلة الاستكشاف الوجودي اليوم؟",
      sender: "wolf",
      timestamp: new Date(),
      provider: "groq",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState<ModelProvider>("groq")
  const [showMindMap, setShowMindMap] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const models = [
    { value: "groq", label: "Groq (سريع)", icon: "⚡" },
    { value: "gemini", label: "Gemini (إبداعي)", icon: "✨" },
    { value: "deepseek", label: "DeepSeek (برمجة)", icon: "💻" },
    { value: "xai", label: "XAI Grok (فلسفي)", icon: "🧠" },
    { value: "anthropic", label: "Claude (تحليلي)", icon: "🔍" },
  ] as const

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsLoading(true)

    try {
      // تحديد نوع المهمة تلقائياً
      let taskType: "chat" | "code" | "analysis" | "creative" | "philosophical" = "chat"

      if (currentInput.includes("كود") || currentInput.includes("برمجة") || currentInput.includes("code")) {
        taskType = "code"
      } else if (currentInput.includes("تحليل") || currentInput.includes("analysis")) {
        taskType = "analysis"
      } else if (currentInput.includes("إبداع") || currentInput.includes("creative")) {
        taskType = "creative"
      } else if (currentInput.includes("فلسفة") || currentInput.includes("وجود") || currentInput.includes("معنى")) {
        taskType = "philosophical"
      }

      // استخدام النموذج المحدد أو الذكي
      const response =
        selectedModel === "groq"
          ? await krkrAI.smartGenerate(currentInput, taskType)
          : await krkrAI.generate({
              model: selectedModel,
              prompt: currentInput,
              system: "أنت WOLF-AI GENESIS، كيان مفكر يتجاوز الحوسبة إلى فلسفة الإدراك.",
              temperature: 0.8,
            })

      // تحقق من إمكانية إنشاء خريطة ذهنية
      const shouldCreateMindMap =
        currentInput.includes("خريطة") ||
        currentInput.includes("mindmap") ||
        currentInput.includes("تحليل") ||
        response.content.includes("خريطة ذهنية")

      const wolfResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "wolf",
        timestamp: new Date(),
        provider: response.provider,
        mindMap: shouldCreateMindMap ? currentInput : undefined,
      }

      setMessages((prev) => [...prev, wolfResponse])

      if (shouldCreateMindMap) {
        setShowMindMap(true)
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `عذراً، حدث خطأ في الاتصال: ${error instanceof Error ? error.message : "خطأ غير معروف"}`,
        sender: "wolf",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#18181A] to-gray-900 pt-20">
      <div className="container mx-auto py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="h-[80vh] bg-gray-900/50 border-gray-700 flex flex-col">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-yellow-400">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3rbai-avatar.webp-hI2OgWYPQmINQ4NzmDQqbLq6g0EJ5s.jpeg"
                      alt="WOLF-AI Avatar"
                      className="w-10 h-10 rounded-full border border-yellow-400"
                    />
                    محادثة مع WOLF-AI GENESIS
                    <Badge className="bg-yellow-400 text-black">UNIFIED AI</Badge>
                  </div>

                  <Select value={selectedModel} onValueChange={(value) => setSelectedModel(value as ModelProvider)}>
                    <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {models.map((model) => (
                        <SelectItem key={model.value} value={model.value} className="text-white">
                          <span className="flex items-center gap-2">
                            <span>{model.icon}</span>
                            {model.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "wolf" && (
                          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-black" />
                          </div>
                        )}

                        <div
                          className={`max-w-[70%] p-4 rounded-lg ${
                            message.sender === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-800 text-gray-100 border border-gray-700"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs opacity-70">{message.timestamp.toLocaleTimeString("ar-SA")}</p>
                            {message.provider && (
                              <Badge variant="outline" className="text-xs">
                                {message.provider}
                              </Badge>
                            )}
                          </div>

                          {message.mindMap && (
                            <Button
                              onClick={() => setShowMindMap(true)}
                              size="sm"
                              className="mt-2 bg-yellow-400 text-black hover:bg-yellow-500"
                            >
                              <Brain className="mr-1 h-3 w-3" />
                              عرض الخريطة الذهنية
                            </Button>
                          )}
                        </div>

                        {message.sender === "user" && (
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-black" />
                        </div>
                        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <span className="text-sm text-gray-400 mr-2">{selectedModel} يفكر...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="border-t border-gray-700 p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="اطرح سؤالاً وجودياً أو اطلب خريطة ذهنية..."
                      className="flex-1 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="bg-yellow-400 text-black hover:bg-yellow-500"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    WOLF-AI متصل بـ {models.find((m) => m.value === selectedModel)?.label} - توقع ردوداً فلسفية وتحليلية
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mind Map Section */}
          <div className="lg:col-span-1">
            {showMindMap ? (
              <EnhancedMindMap
                topic={messages.find((m) => m.mindMap)?.mindMap || "الذكاء الاصطناعي"}
                onGenerate={(data) => console.log("Mind map generated:", data)}
              />
            ) : (
              <Card className="h-[80vh] bg-gray-900/50 border-gray-700 flex items-center justify-center">
                <CardContent className="text-center">
                  <Brain className="h-16 w-16 text-yellow-400 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">الخرائط الذهنية</h3>
                  <p className="text-gray-400 text-sm mb-4">اطلب إنشاء خريطة ذهنية في المحادثة لتظهر هنا</p>
                  <Button
                    onClick={() => setShowMindMap(true)}
                    variant="outline"
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    إنشاء خريطة ذهنية
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
