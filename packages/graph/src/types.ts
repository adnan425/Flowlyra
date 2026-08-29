export type SourceLocation = {
  filePath: string
  startLine: number
  startColumn: number
  endLine: number
  endColumn: number
}

export type Confidence = 'direct' | 'inferred'

export type Evidence = {
  kind: Confidence
  reason: string
  location?: SourceLocation
}

export type NodeKind =
  | 'file'
  | 'module'
  | 'function'
  | 'class'
  | 'route'
  | 'component'
  | 'service'
  | 'repository'
  | 'database-model'
  | 'queue'
  | 'event'
  | 'external-service'

export type EdgeKind =
  | 'imports'
  | 'calls'
  | 'handles-route'
  | 'reads-from'
  | 'writes-to'
  | 'emits'
  | 'consumes'
  | 'renders'
  | 'invokes-external'

export type FlowNode = {
  id: string
  kind: NodeKind
  name: string
  location?: SourceLocation
}

export type FlowEdge = {
  id: string
  kind: EdgeKind
  from: string
  to: string
  confidence: Confidence
  evidence?: Evidence
}

export type SerializedGraph = {
  nodes: FlowNode[]
  edges: FlowEdge[]
}
