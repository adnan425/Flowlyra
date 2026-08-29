import { FlowGraph } from '@flowlyra/graph'
import type { SerializedGraph } from '@flowlyra/graph'
import { parseTypeScriptProject } from '@flowlyra/parser-typescript'
import { traceFeature } from '@flowlyra/tracer'
import type { FeatureFlow } from '@flowlyra/tracer'

export type AnalysisRequest = {
  rootDir: string
  feature?: string
}

export type AnalysisResult = {
  rootDir: string
  analyzedAt: string
  graph: SerializedGraph
  flows: FeatureFlow[]
}

export async function analyze(request: AnalysisRequest): Promise<AnalysisResult> {
  await parseTypeScriptProject(request.rootDir)

  const graph = new FlowGraph()
  const flows = request.feature ? [traceFeature(graph, request.feature)] : []

  return {
    rootDir: request.rootDir,
    analyzedAt: new Date().toISOString(),
    graph: graph.toJSON(),
    flows
  }
}
