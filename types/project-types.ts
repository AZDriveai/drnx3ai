export interface ProjectNode {
  name: string
  description?: string
  details?: string
  type?: "features" | "interface" | "design" | "overview"
  children?: ProjectNode[]
}

export interface ProjectAnalysisResult {
  structure: ProjectNode
  stats: {
    totalFiles: number
    totalComponents: number
    totalPages: number
    totalHooks: number
    totalUtilities: number
  }
  insights?: {
    complexity: number
    patterns: string[]
    recommendations: string[]
  }
}
