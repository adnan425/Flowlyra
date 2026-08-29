import type { FlowEdge, FlowNode, SerializedGraph } from './types.js'

export class FlowGraph {
  readonly nodes = new Map<string, FlowNode>()
  readonly edges: FlowEdge[] = []

  addNode(node: FlowNode): FlowNode {
    this.nodes.set(node.id, node)
    return node
  }

  addEdge(edge: FlowEdge): FlowEdge {
    this.edges.push(edge)
    return edge
  }

  getNode(id: string): FlowNode | undefined {
    return this.nodes.get(id)
  }

  toJSON(): SerializedGraph {
    return {
      nodes: [...this.nodes.values()],
      edges: [...this.edges]
    }
  }
}
