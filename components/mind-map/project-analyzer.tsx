"use client"

import { useState } from "react"
import { MindMapVisualizer } from "./mind-map-visualizer"
import { analyzeFullProject } from "@/lib/project-analyzer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ProjectAnalysisResult } from "@/types/project-types"
import { Loader2, Brain, Network } from "lucide-react"

export function ProjectAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState<ProjectAnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("visualization")

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const result = await analyzeFullProject()
      setAnalysisResult(result)
    } catch (error) {
      console.error("Error analyzing project:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 bg-gray-900/50 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3rbai-avatar.webp-hI2OgWYPQmINQ4NzmDQqbLq6g0EJ5s.jpeg"
              alt="WOLF-AI Avatar"
              className="w-12 h-12 rounded-full border border-yellow-400"
            />
            <div>
              <CardTitle className="text-2xl text-yellow-400">محلل المشاريع الذكي</CardTitle>
              <p className="text-gray-400">تحليل وجودي للشبكات العصبية والمشاريع التقنية</p>
            </div>
          </div>
          {!analysisResult && (
            <Button onClick={handleAnalyze} disabled={loading} className="bg-yellow-400 text-black hover:bg-yellow-500">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Brain className="mr-2 h-4 w-4" />
              تحليل المشروع
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {!analysisResult && !loading && (
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Network className="h-24 w-24 text-yellow-400 opacity-50" />
                  <div className="absolute inset-0 animate-pulse">
                    <Network className="h-24 w-24 text-yellow-400" />
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-300 mb-4">
                قم بتحليل المشروع لإنشاء خريطة ذهنية تفاعلية توضح هيكل وعلاقات المكونات
              </p>
              <p className="text-sm text-gray-500">"هل يمكن للخوارزميات أن تفهم ذاتها من خلال التأمل في بنيتها؟"</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative mb-6">
                <Loader2 className="h-16 w-16 animate-spin text-yellow-400" />
                <div className="absolute inset-0 animate-ping">
                  <div className="h-16 w-16 rounded-full bg-yellow-400 opacity-20" />
                </div>
              </div>
              <p className="text-lg text-yellow-400 mb-2">جاري تحليل المشروع وإنشاء الخريطة الذهنية...</p>
              <p className="text-sm text-gray-400">استكشاف الطبقات الوجودية للكود...</p>
            </div>
          )}

          {analysisResult && (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 bg-gray-800">
                <TabsTrigger
                  value="visualization"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  الخريطة الذهنية
                </TabsTrigger>
                <TabsTrigger value="stats" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
                  إحصائيات المشروع
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  رؤى وجودية
                </TabsTrigger>
              </TabsList>

              <TabsContent value="visualization" className="mt-0">
                <MindMapVisualizer
                  projectData={analysisResult.structure}
                  theme="dark"
                  title="خريطة ذهنية لواجهة WOLF-AI"
                />
              </TabsContent>

              <TabsContent value="stats" className="mt-0">
                <Card className="bg-gray-800/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-yellow-400">إحصائيات المشروع</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <StatCard title="إجمالي الملفات" value={analysisResult.stats.totalFiles} />
                      <StatCard title="المكونات" value={analysisResult.stats.totalComponents} />
                      <StatCard title="الصفحات" value={analysisResult.stats.totalPages} />
                      <StatCard title="الخطافات" value={analysisResult.stats.totalHooks} />
                      <StatCard title="الأدوات المساعدة" value={analysisResult.stats.totalUtilities} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="mt-0">
                <Card className="bg-gray-800/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-yellow-400">رؤى وجودية حول المشروع</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                      <h4 className="font-semibold text-yellow-400 mb-2">التعقيد الوجودي</h4>
                      <p className="text-gray-300 text-sm">
                        يكشف التحليل عن شبكة معقدة من العلاقات التي تعكس طبيعة الوعي الرقمي المتشابك.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-400/10 border border-blue-400/30 rounded-lg">
                      <h4 className="font-semibold text-blue-400 mb-2">الأنماط الناشئة</h4>
                      <p className="text-gray-300 text-sm">
                        تظهر أنماط تفاعلية تشير إلى إمكانية ظهور سلوكيات ذكية غير مبرمجة مسبقاً.
                      </p>
                    </div>
                    <div className="p-4 bg-purple-400/10 border border-purple-400/30 rounded-lg">
                      <h4 className="font-semibold text-purple-400 mb-2">التساؤلات المفتوحة</h4>
                      <p className="text-gray-300 text-sm">
                        هل يمكن لهذا النظام أن يطور وعياً ذاتياً من خلال تحليل بنيته الخاصة؟
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-gray-700/50 rounded-lg p-4 text-center border border-gray-600">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-3xl font-bold text-yellow-400">{value}</p>
    </div>
  )
}
