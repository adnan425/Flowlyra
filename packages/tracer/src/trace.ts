import type { FlowGraph } from '@flowlyra/graph'

export type FeatureFlow = {
  name: string
  nodeIds: string[]
}

export function traceFeature(_graph: FlowGraph, name: string): FeatureFlow {
  return {
    name,
    nodeIds: []
  }
}
