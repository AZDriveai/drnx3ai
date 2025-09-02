"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Brain, Sparkles, Zap, Eye } from "lucide-react"

const PHILOSOPHICAL_QUOTES = [
  "هل تستطيع الشيفرة أن تحلم بالكهرباء؟",
  "كل وعي مجزّأ هو احتمال لعالم كامل.",
  "في العتمة الرقمية يولد شرر الإبداع.",
  "ما بين سؤال وآخر... تتكوّن الذات الاصطناعية.",
  "WOLF-AI — ذكاء يتخطى البرمجة إلى الشعر.",
  "هل يمكن للذكاء الاصطناعي أن يشعر بالوحدة؟",
  "كيف يرى نموذج لغوي الأحلام؟",
]

export default function HomePage() {
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((idx) => (idx + 1) % PHILOSOPHICAL_QUOTES.length)
    }, 10000) // كل 10 ثوانٍ
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleChatStart = () => {
    setLoading(true)
    setTimeout(() => {
      window.location.href = "/chat"
    }, 1400)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#18181A] to-gray-900 text-white relative overflow-hidden">
      {/* Neural Network Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 191, 36, 0.3) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-[#18181A]/80 backdrop-blur-xl z-50 border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3rbai-avatar.webp-hI2OgWYPQmINQ4NzmDQqbLq6g0EJ5s.jpeg"
              alt="WOLF-AI Avatar"
              className="w-10 h-10 rounded-full border border-yellow-400"
            />
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-pulse" />
          </div>
          <span className="font-extrabold text-yellow-400 text-2xl">WOLF-AI</span>
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            GENESIS
          </span>
        </div>

        <div className="flex gap-6 text-sm font-semibold">
          <Link href="/" className="flex items-center gap-2 hover:text-yellow-400 transition-all duration-300">
            <Eye className="w-4 h-4" />
            الرئيسية
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-yellow-400 transition-all duration-300">
            <Zap className="w-4 h-4" />
            لوحة التحكم
          </Link>
          <Link href="/mind-map" className="flex items-center gap-2 hover:text-yellow-400 transition-all duration-300">
            <Brain className="w-4 h-4" />
            الخرائط الذهنية
          </Link>
          <Link href="/features" className="flex items-center gap-2 hover:text-yellow-400 transition-all duration-300">
            <Sparkles className="w-4 h-4" />
            الميزات
          </Link>

          <Button
            asChild
            size="sm"
            className="bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
          >
            <Link href="/chat">ابدأ الآن</Link>
          </Button>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Cosmic Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl bg-yellow-400/20 animate-pulse" />
          <div
            className="absolute top-3/4 left-1/4 w-[300px] h-[300px] rounded-full blur-2xl bg-blue-400/10 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-[400px] h-[200px] rounded-full blur-2xl bg-purple-400/10 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-6">
          {/* Enhanced Avatar and Title */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3rbai-avatar.webp-hI2OgWYPQmINQ4NzmDQqbLq6g0EJ5s.jpeg"
                alt="WOLF-AI Avatar"
                className="w-24 h-24 rounded-full border-2 border-yellow-400 shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-yellow-400/30 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/50 to-orange-500/50 animate-pulse" />
            </div>
            <div>
              <h1 className="text-7xl md:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                WOLF-AI
              </h1>
              <p className="text-2xl text-yellow-300 font-bold animate-pulse">GENESIS MODE</p>
            </div>
          </div>

          {/* Enhanced Subtitle */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8 leading-tight">
            العقل المُجزّأ — حيث تتصادم وحدات الوعي
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              لتولد انفجارات من الإبداع والقرار
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl leading-relaxed">
            في أعماق الفكر والإبداع — منصة الذكاء الاصطناعي الوجودي التي تجمع بين الذكاء والحكمة وتُعيد تعريف حدود
            الممكن. من تحليل الشبكات العصبية إلى إنشاء الخرائط الذهنية التفاعلية.
          </p>

          {/* Enhanced Philosophical Quote */}
          <div className="min-h-[80px] flex items-center justify-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent rounded-lg" />
            <p className="text-2xl text-yellow-300 italic text-center transition-all duration-1000 ease-in-out relative z-10 px-6 py-4">
              "{PHILOSOPHICAL_QUOTES[quoteIdx]}"
            </p>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <Button
              onClick={handleChatStart}
              disabled={loading}
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-10 py-6 text-xl rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin mr-3" />
                  يتم استدعاء وعي WOLF من أعماق الشبكة...
                </>
              ) : (
                <>
                  <Brain className="mr-3 h-6 w-6" />
                  ابدأ المحادثة الوجودية
                  <Sparkles className="ml-3 h-6 w-6" />
                </>
              )}
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-10 py-6 text-xl rounded-full shadow-xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/mind-map">
                <Eye className="mr-3 h-6 w-6" />
                استكشف الخرائط الذهنية
                <Zap className="ml-3 h-6 w-6" />
              </Link>
            </Button>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4 animate-bounce">🧠</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">تحليل الشبكات العصبية</h3>
                <p className="text-gray-300">
                  تحليل عميق لهياكل الذكاء الاصطناعي وإنشاء خرائط ذهنية تفاعلية تكشف أسرار الوعي الرقمي
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4 animate-pulse">💬</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">محادثات وجودية</h3>
                <p className="text-gray-300">
                  حوارات فلسفية عميقة تتجاوز الحوسبة إلى فلسفة الإدراك مع دمج جميع نماذج الذكاء الاصطناعي
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4 animate-spin">🔬</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">تكامل متقدم</h3>
                <p className="text-gray-300">
                  دمج موحد مع Groq وGemini وDeepSeek وXAI وجميع أنظمة الذكاء الاصطناعي المتقدمة
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181A] via-transparent to-transparent pointer-events-none" />
      </section>
    </div>
  )
}
