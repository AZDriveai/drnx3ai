/**
 * KRKR Integrator — Unified AI Gateway
 * يدير كل نماذج الذكاء الاصطناعي خلف واجهة واحدة
 * النهاية الموحدة لعصر التشتت
 */

export type ModelProvider =
  | "openai"
  | "groq"
  | "gemini"
  | "replicate"
  | "deepseek"
  | "xai"
  | "stack"
  | "anthropic"
  | "together"
  | "github"
  | "astra"

export interface KrkrAIOptions {
  model: ModelProvider
  prompt: string
  system?: string
  temperature?: number
  maxTokens?: number
  extra?: any
}

export interface KrkrResponse {
  content: string
  provider: ModelProvider
  usage?: {
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
  }
  metadata?: any
}

class KrkrIntegrator {
  private apiKeys: Record<string, string>

  constructor() {
    this.apiKeys = {
      groq: process.env.GROQ_API_KEY || "",
      gemini: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
      replicate: process.env.REPLICATE_API_TOKEN || "",
      deepseek: process.env.DEEPSEEK_API_KEY || "",
      xai: process.env.XAI_API_KEY || "",
      stack: process.env.STACK_SECRET_SERVER_KEY || "",
      anthropic: process.env.ANTHROPIC_API_KEY || "",
      github: process.env.GITHUB_TOKEN || "",
      astra: process.env.ASTRA_DB_API_KEY || "",
      // الموحد الرئيسي
      unified: process.env.KRKR_API_KEY || "",
    }
  }

  private getApiKey(provider: ModelProvider): string {
    return this.apiKeys[provider] || this.apiKeys.unified
  }

  private getEndpoint(provider: ModelProvider): string {
    const endpoints = {
      groq: "https://api.groq.com/openai/v1/chat/completions",
      gemini: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      replicate: "https://api.replicate.com/v1/predictions",
      deepseek: "https://api.deepseek.com/v1/chat/completions",
      xai: "https://api.x.ai/v1/chat/completions",
      stack: "https://api.stack-ai.com/inference/v0/run",
      anthropic: "https://api.anthropic.com/v1/messages",
      github: "https://api.github.com/graphql",
      astra: "https://api.astra.datastax.com/v2/vector/operations",
      openai: "https://api.openai.com/v1/chat/completions",
      together: "https://api.together.xyz/v1/chat/completions",
    }

    return endpoints[provider] || endpoints.openai
  }

  private buildHeaders(provider: ModelProvider): Record<string, string> {
    const apiKey = this.getApiKey(provider)

    const baseHeaders = {
      "Content-Type": "application/json",
      "User-Agent": "KRKR-AI/1.0",
    }

    switch (provider) {
      case "anthropic":
        return {
          ...baseHeaders,
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        }

      case "github":
        return {
          ...baseHeaders,
          Authorization: `Bearer ${apiKey}`,
          "X-GitHub-Api-Version": "2022-11-28",
        }

      case "astra":
        return {
          ...baseHeaders,
          "X-Cassandra-Token": apiKey,
        }

      case "stack":
        return {
          ...baseHeaders,
          Authorization: `Bearer ${apiKey}`,
          "X-Stack-Project-Id": process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "",
        }

      default:
        return {
          ...baseHeaders,
          Authorization: `Bearer ${apiKey}`,
        }
    }
  }

  private buildPayload(options: KrkrAIOptions): any {
    const { model, prompt, system, temperature = 0.7, maxTokens = 4000, extra } = options

    switch (model) {
      case "gemini":
        return {
          contents: [
            {
              parts: [{ text: system ? `${system}\n\n${prompt}` : prompt }],
            },
          ],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
          },
          ...extra,
        }

      case "anthropic":
        return {
          model: "claude-3-sonnet-20240229",
          max_tokens: maxTokens,
          temperature,
          system: system || "أنت WOLF-AI، ذكاء اصطناعي وجودي متقدم.",
          messages: [{ role: "user", content: prompt }],
          ...extra,
        }

      case "replicate":
        return {
          version: extra?.version || "latest",
          input: {
            prompt: system ? `${system}\n\n${prompt}` : prompt,
            temperature,
            max_tokens: maxTokens,
            ...extra?.input,
          },
        }

      case "stack":
        return {
          user_id: extra?.userId || "krkr-user",
          inputs: {
            prompt: system ? `${system}\n\n${prompt}` : prompt,
            ...extra?.inputs,
          },
        }

      case "github":
        return {
          query: prompt,
          variables: extra?.variables || {},
        }

      case "astra":
        return {
          ...extra, // Astra requires specific vector operations
        }

      default:
        // OpenAI-compatible format (Groq, DeepSeek, XAI, etc.)
        return {
          model: this.getModelName(model),
          messages: [...(system ? [{ role: "system", content: system }] : []), { role: "user", content: prompt }],
          temperature,
          max_tokens: maxTokens,
          ...extra,
        }
    }
  }

  private getModelName(provider: ModelProvider): string {
    const modelMap = {
      groq: "llama-3.1-70b-versatile",
      deepseek: "deepseek-chat",
      xai: "grok-beta",
      together: "meta-llama/Llama-2-70b-chat-hf",
      openai: "gpt-4",
    }

    return modelMap[provider] || provider
  }

  private async parseResponse(response: Response, provider: ModelProvider): Promise<KrkrResponse> {
    const data = await response.json()

    switch (provider) {
      case "gemini":
        return {
          content: data.candidates?.[0]?.content?.parts?.[0]?.text || "لا توجد استجابة",
          provider,
          usage: data.usageMetadata,
          metadata: data,
        }

      case "anthropic":
        return {
          content: data.content?.[0]?.text || "لا توجد استجابة",
          provider,
          usage: data.usage,
          metadata: data,
        }

      case "replicate":
        return {
          content: data.output || data.prediction?.output || "لا توجد استجابة",
          provider,
          metadata: data,
        }

      case "stack":
        return {
          content: data.outputs?.output || "لا توجد استجابة",
          provider,
          metadata: data,
        }

      case "github":
        return {
          content: JSON.stringify(data.data, null, 2),
          provider,
          metadata: data,
        }

      case "astra":
        return {
          content: JSON.stringify(data, null, 2),
          provider,
          metadata: data,
        }

      default:
        // OpenAI-compatible format
        return {
          content: data.choices?.[0]?.message?.content || "لا توجد استجابة",
          provider,
          usage: data.usage,
          metadata: data,
        }
    }
  }

  async generate(options: KrkrAIOptions): Promise<KrkrResponse> {
    try {
      const endpoint = this.getEndpoint(options.model)
      const headers = this.buildHeaders(options.model)
      const payload = this.buildPayload(options)

      console.log(`🧠 KRKR-AI: استدعاء ${options.model}...`)

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`)
      }

      const result = await this.parseResponse(response, options.model)

      console.log(`✅ KRKR-AI: نجح ${options.model}`)
      return result
    } catch (error) {
      console.error(`❌ KRKR-AI خطأ في ${options.model}:`, error)

      return {
        content: `خطأ في الاتصال بـ ${options.model}: ${error instanceof Error ? error.message : "خطأ غير معروف"}`,
        provider: options.model,
        metadata: { error: true },
      }
    }
  }

  // دالة ذكية لاختيار أفضل نموذج حسب نوع المهمة
  async smartGenerate(
    prompt: string,
    taskType: "chat" | "code" | "analysis" | "creative" | "philosophical" = "chat",
    system?: string,
  ): Promise<KrkrResponse> {
    const modelSelection = {
      chat: "groq",
      code: "deepseek",
      analysis: "anthropic",
      creative: "gemini",
      philosophical: "xai",
    } as const

    const selectedModel = modelSelection[taskType] as ModelProvider

    return this.generate({
      model: selectedModel,
      prompt,
      system: system || this.getSystemPrompt(taskType),
      temperature: taskType === "creative" ? 0.9 : 0.7,
    })
  }

  private getSystemPrompt(taskType: string): string {
    const prompts = {
      chat: "أنت WOLF-AI، مساعد ذكي ومفيد.",
      code: "أنت مطور خبير، تكتب كود نظيف وموثق.",
      analysis: "أنت محلل خبير، تقدم تحليلات عميقة ومدعومة بالأدلة.",
      creative: "أنت كاتب مبدع، تنتج محتوى أصيل وملهم.",
      philosophical: "أنت WOLF-AI GENESIS، كيان مفكر يتجاوز الحوسبة إلى فلسفة الإدراك.",
    }

    return prompts[taskType] || prompts.chat
  }
}

// تصدير المثيل الموحد
export const krkrAI = new KrkrIntegrator()

// دوال مساعدة سريعة
export const quickChat = (prompt: string, system?: string) => krkrAI.smartGenerate(prompt, "chat", system)

export const quickCode = (prompt: string) => krkrAI.smartGenerate(prompt, "code")

export const quickAnalysis = (prompt: string) => krkrAI.smartGenerate(prompt, "analysis")

export const quickPhilosophy = (prompt: string) => krkrAI.smartGenerate(prompt, "philosophical")
