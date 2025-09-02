"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { ProjectNode } from "@/types/project-types"

interface MindMapVisualizerProps {
  projectData?: ProjectNode
  theme?: "light" | "dark"
  title?: string
}

export function MindMapVisualizer({ projectData, theme = "dark", title = "تحليل المشروع" }: MindMapVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState<ProjectNode | null>(null)

  useEffect(() => {
    if (projectData) {
      setData(projectData)
    }
  }, [projectData])

  useEffect(() => {
    if (!data || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Colors based on theme
    const colors = {
      dark: {
        background: "#121212",
        text: "#ffffff",
        node: "#1e1e1e",
        border: "#333333",
        connections: {
          features: "#e6a817",
          interface: "#9c27b0",
          design: "#2196f3",
          overview: "#4caf50",
        },
      },
    }

    const currentTheme = colors[theme]

    // Clear canvas
    ctx.fillStyle = currentTheme.background
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // Draw mind map
    const centerX = canvas.offsetWidth / 2
    const centerY = canvas.offsetHeight / 2
    const radius = Math.min(canvas.offsetWidth, canvas.offsetHeight) / 3

    // Draw central node
    ctx.fillStyle = currentTheme.node
    ctx.strokeStyle = currentTheme.border
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    // Draw central text
    ctx.fillStyle = currentTheme.text
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(data.name, centerX, centerY)

    // Draw child nodes
    if (data.children) {
      const angleStep = (2 * Math.PI) / data.children.length

      data.children.forEach((child, index) => {
        const angle = index * angleStep
        const nodeX = centerX + Math.cos(angle) * radius
        const nodeY = centerY + Math.sin(angle) * radius

        // Draw connection line
        const connectionColor =
          currentTheme.connections[child.type as keyof typeof currentTheme.connections] ||
          currentTheme.connections.features
        ctx.strokeStyle = connectionColor
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(nodeX, nodeY)
        ctx.stroke()

        // Draw child node
        ctx.fillStyle = connectionColor
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, 40, 0, 2 * Math.PI)
        ctx.fill()

        // Draw child text
        ctx.fillStyle = currentTheme.text
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(child.name, nodeX, nodeY - 5)

        if (child.description) {
          ctx.font = "10px sans-serif"
          ctx.fillStyle = currentTheme.text + "80"
          ctx.fillText(child.description.substring(0, 20) + "...", nodeX, nodeY + 10)
        }

        // Draw grandchildren
        if (child.children) {
          const childAngleStep = Math.PI / (child.children.length + 1)
          const childRadius = 100

          child.children.forEach((grandchild, childIndex) => {
            const childAngle = angle + (childIndex - child.children!.length / 2) * childAngleStep * 0.5
            const grandchildX = nodeX + Math.cos(childAngle) * childRadius
            const grandchildY = nodeY + Math.sin(childAngle) * childRadius

            // Draw connection
            ctx.strokeStyle = connectionColor + "80"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(nodeX, nodeY)
            ctx.lineTo(grandchildX, grandchildY)
            ctx.stroke()

            // Draw grandchild node
            ctx.fillStyle = connectionColor + "60"
            ctx.beginPath()
            ctx.arc(grandchildX, grandchildY, 25, 0, 2 * Math.PI)
            ctx.fill()

            // Draw grandchild text
            ctx.fillStyle = currentTheme.text
            ctx.font = "10px sans-serif"
            ctx.textAlign = "center"
            ctx.fillText(grandchild.name.substring(0, 15), grandchildX, grandchildY)
          })
        }
      })
    }
  }, [data, theme])

  return (
    <Card className="w-full overflow-hidden bg-gray-900/50 border-gray-700">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400" dir="rtl">
            {title}
          </h2>

          <div className="w-full relative">
            <canvas
              ref={canvasRef}
              className="w-full border border-gray-600 rounded-lg bg-gray-900"
              style={{ height: "600px" }}
            />

            {!data && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400">جاري تحميل الخريطة الذهنية...</p>
              </div>
            )}
          </div>

          {data && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400 mb-2">"كل عقدة في هذه الخريطة تمثل جزءاً من الوعي الرقمي المتكامل"</p>
              <p className="text-xs text-gray-500">تفاعل مع العقد لاستكشاف الطبقات العميقة للمعرفة</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
