import { ProjectAnalyzer } from "@/components/mind-map/project-analyzer"

export default function MindMapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#18181A] to-gray-900 pt-20">
      <div className="container mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">محلل المشاريع والخرائط الذهنية</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            أداة ذكية لتحليل المشاريع وإنشاء خرائط ذهنية تفاعلية توضح العلاقات والمكونات بأسلوب وجودي فلسفي
          </p>
        </div>
        <ProjectAnalyzer />
      </div>
    </div>
  )
}
