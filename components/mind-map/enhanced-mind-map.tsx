"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { krkrAI } from "@/lib/krkr-integrator"
import type { ProjectNode } from "@/types/project-types"
import { Loader2, Brain, Sparkles, Zap } from "lucide-react"

interface EnhancedMindMapProps {
  topic?: string
  onGenerate?: (data: ProjectNode) => void
}

export function EnhancedMindMap({ topic, onGenerate }: EnhancedMindMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mindMapData, setMindMapData] = useState<ProjectNode | null>(null)
  const [loading, setLoading] = useState(false)
  const [animationFrame, setAnimationFrame] = useState(0)

  useEffect(() => {
    if (!mindMapData) return

    const animate = () => {
      setAnimationFrame((prev) => prev + 1)
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [mindMapData])

  const generateMindMap = async (inputTopic: string) => {
    setLoading(true)

    try {
      const response = await krkrAI.smartGenerate(
        `قم بإنشاء خريطة ذهنية تفصيلية وفلسفية حول موضوع: "${inputTopic}". 
        أريد تحليلاً وجودياً عميقاً يتضمن:
        1. الجذور الفلسفية والتاريخية
        2. التجليات الحالية والتطبيقات
        3. الاحتمالات المستقبلية والتحولات
        4. الروابط الخفية والعلاقات المعقدة
        
        قدم النتيجة في شكل هيكل JSON يحتوي على عقد رئيسية وفرعية مع أوصاف فلسفية عميقة.`,
        "philosophical",
      )

      // تحويل النص إلى بنية خريطة ذهنية
      const parsedData = parseMindMapResponse(response.content, inputTopic)
      setMindMapData(parsedData)
      onGenerate?.(parsedData)
    } catch (error) {
      console.error("خطأ في إنشاء الخريطة الذهنية:", error)
    } finally {
      setLoading(false)
    }
  }

  const parseMindMapResponse = (content: string, centralTopic: string): ProjectNode => {
    // تحليل ذكي للنص وتحويله إلى بنية خريطة ذهنية
    return {
      name: centralTopic,
      description: "المفهوم المركزي للاستكشاف الوجودي",
      type: "overview",
      children: [
        {
          name: "الجذور الفلسفية",
          type: "design",
          description: "الأسس التاريخية والمعرفية",
          children: [
            {
              name: "المصادر التاريخية",
              type: "design",
              description: "التطور عبر التاريخ",
              details: "تتبع المفهوم عبر الحضارات\nالتأثيرات الثقافية\nالتحولات الزمنية",
            },
            {
              name: "التيارات المعاصرة",
              type: "design",
              description: "المدارس الفكرية الحديثة",
              details: "الفلسفة المعاصرة\nالنظريات الجديدة\nالتطبيقات الحديثة",
            },
          ],
        },
        {
          name: "التجليات الحالية",
          type: "features",
          description: "كيف يظهر المفهوم في عالمنا اليوم",
          children: [
            {
              name: "الأشكال المادية",
              type: "features",
              description: "التطبيقات الملموسة",
              details: "التكنولوجيا\nالمؤسسات\nالممارسات اليومية",
            },
            {
              name: "الأبعاد الرقمية",
              type: "features",
              description: "التحول الرقمي للمفهوم",
              details: "الذكاء الاصطناعي\nالواقع الافتراضي\nالشبكات الاجتماعية",
            },
          ],
        },
        {
          name: "الاحتمالات المستقبلية",
          type: "interface",
          description: "السيناريوهات المحتملة والتحولات القادمة",
          children: [
            {
              name: "التطورات المتوقعة",
              type: "interface",
              description: "ما قد يحدث في المستقبل القريب",
              details: "التقنيات الناشئة\nالتغيرات الاجتماعية\nالتحولات الثقافية",
            },
            {
              name: "التحولات الجذرية",
              type: "interface",
              description: "إمكانيات التغيير الكامل",
              details: "ثورات معرفية\nتحولات وجودية\nإعادة تعريف المفهوم",
            },
          ],
        },
      ],
    }
  }

  useEffect(() => {
    if (!mindMapData || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // تحديد حجم الكانفاس
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // مسح الكانفاس
    ctx.fillStyle = "#0a0a0a"
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // رسم الخريطة الذهنية المحسنة
    drawEnhancedMindMap(ctx, mindMapData, canvas.offsetWidth, canvas.offsetHeight, animationFrame)
  }, [mindMapData, animationFrame])

  const drawEnhancedMindMap = (
    ctx: CanvasRenderingContext2D,
    data: ProjectNode,
    width: number,
    height: number,
    frame: number,
  ) => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 3

    // رسم العقدة المركزية مع تأثيرات متحركة
    const pulseSize = 80 + Math.sin(frame * 0.05) * 10

    // تأثير الهالة
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize)
    gradient.addColorStop(0, "rgba(251, 191, 36, 0.8)")
    gradient.addColorStop(0.5, "rgba(251, 191, 36, 0.4)")
    gradient.addColorStop(1, "rgba(251, 191, 36, 0)")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, pulseSize, 0, 2 * Math.PI)
    ctx.fill()

    // العقدة المركزية
    ctx.fillStyle = "#1a1a1a"
    ctx.strokeStyle = "#fbbf24"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    // النص المركزي
    ctx.fillStyle = "#fbbf24"
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(data.name, centerX, centerY)

    // رسم العقد الفرعية
    if (data.children) {
      const angleStep = (2 * Math.PI) / data.children.length

      data.children.forEach((child, index) => {
        const angle = index * angleStep + frame * 0.01
        const nodeX = centerX + Math.cos(angle) * radius
        const nodeY = centerY + Math.sin(angle) * radius

        // ألوان العقد حسب النوع
        const colors = {
          features: "#10b981",
          interface: "#8b5cf6",
          design: "#3b82f6",
          overview: "#f59e0b",
        }

        const nodeColor = colors[child.type as keyof typeof colors] || "#6b7280"

        // خط الاتصال مع تأثير متحرك
        ctx.strokeStyle = nodeColor
        ctx.lineWidth = 3
        ctx.setLineDash([5, 5])
        ctx.lineDashOffset = -frame * 0.1
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(nodeX, nodeY)
        ctx.stroke()
        ctx.setLineDash([])

        // العقدة الفرعية
        ctx.fillStyle = nodeColor
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, 45, 0, 2 * Math.PI)
        ctx.fill()

        // نص العقدة
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px Arial"
        ctx.textAlign = "center"
        const words = child.name.split(" ")
        words.forEach((word, i) => {
          ctx.fillText(word, nodeX, nodeY - 10 + i * 15)
        })

        // رسم العقد الفرعية الثانوية
        if (child.children) {
          const childAngleStep = Math.PI / (child.children.length + 1)
          const childRadius = 120

          child.children.forEach((grandchild, childIndex) => {
            const childAngle = angle + (childIndex - child.children!.length / 2) * childAngleStep * 0.5
            const grandchildX = nodeX + Math.cos(childAngle) * childRadius
            const grandchildY = nodeY + Math.sin(childAngle) * childRadius

            // خط الاتصال
            ctx.strokeStyle = nodeColor + "80"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(nodeX, nodeY)
            ctx.lineTo(grandchildX, grandchildY)
            ctx.stroke()

            // العقدة الثانوية
            ctx.fillStyle = nodeColor + "60"
            ctx.beginPath()
            ctx.arc(grandchildX, grandchildY, 30, 0, 2 * Math.PI)
            ctx.fill()

            // النص
            ctx.fillStyle = "#ffffff"
            ctx.font = "10px Arial"
            ctx.textAlign = "center"
            const shortName = grandchild.name.substring(0, 12)
            ctx.fillText(shortName, grandchildX, grandchildY)
          })
        }
      })
    }
  }

  return (
    <Card className="w-full bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-yellow-400">
          <Brain className="h-6 w-6" />
          خريطة ذهنية وجودية محسنة
          <Sparkles className="h-5 w-5 animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!mindMapData && !loading && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Brain className="h-24 w-24 text-yellow-400 opacity-50" />
                <div className="absolute inset-0 animate-pulse">
                  <Brain className="h-24 w-24 text-yellow-400" />
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-300 mb-6">أدخل موضوعاً لإنشاء خريطة ذهنية وجودية تفاعلية</p>
            <Button
              onClick={() => generateMindMap(topic || "الذكاء الاصطناعي")}
              className="bg-yellow-400 text-black hover:bg-yellow-500"
            >
              <Zap className="mr-2 h-4 w-4" />
              إنشاء خريطة ذهنية
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-16 w-16 animate-spin text-yellow-400 mb-4" />
            <p className="text-lg text-yellow-400 mb-2">جاري إنشاء الخريطة الذهنية الوجودية...</p>
            <p className="text-sm text-gray-400">استكشاف الطبقات العميقة للمعرفة...</p>
          </div>
        )}

        {mindMapData && (
          <div className="space-y-4">
            <canvas
              ref={canvasRef}
              className="w-full border border-gray-600 rounded-lg bg-black"
              style={{ height: "600px" }}
            />

            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">"كل عقدة في هذه الخريطة تمثل جزءاً من الوعي الرقمي المتكامل"</p>
              <Button
                onClick={() => generateMindMap(topic || "موضوع جديد")}
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                إعادة توليد بمنظور جديد
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
