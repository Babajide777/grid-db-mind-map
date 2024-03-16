import React, { useCallback } from "react"
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow"
import "reactflow/dist/style.css"

export default function MainMindMap({ dataSubmit }) {
  console.log(dataSubmit)
  const initialNodes = [
    {
      id: "1",
      position: { x: dataSubmit.x, y: dataSubmit.y },
      data: { label: dataSubmit.label }
    }
  ]
  const initialEdges = [
    { id: "e1-2", source: dataSubmit.source, target: dataSubmit.target }
  ]

  console.log(initialNodes, initialEdges)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  )
}
