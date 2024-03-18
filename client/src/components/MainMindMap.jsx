import React, { useCallback } from "react"
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from "reactflow"
import "reactflow/dist/style.css"

export default function MainMindMap({ dataSubmit }) {
  console.log(dataSubmit)
  const { positionX, positionY, label, source, target } = dataSubmit
  const initialNodes = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label }
    }
  ]
  const initialEdges = []
  // { id: "e1-2", source, target }

  console.log(initialNodes, initialEdges)

  const [nodes, setNodes] = useNodesState(initialNodes)
  const [edges, setEdges] = useEdgesState(initialEdges)

  const onNodesChange = useCallback(() => {
    const newNode = {
      id: `n${nodes.length + 1}`,
      position: {
        x: positionX * window.innerWidth,
        y: positionY * window.innerHeight
      },
      data: { label: label }
    }
    setNodes(prevNodes => [...prevNodes, newNode])
  }, [nodes])

  const onEdgesChange = useCallback(() => {
    const newEdge = {
      id: `e${edges.length - edges.length + 1}`,
      source,
      target,
      label: "to the",
      type: "step"
    }
    setEdges(prevEdges => [...prevEdges, newEdge])
  }, [edges, source, target])

  // const onConnect = useCallback(
  //   params => setEdges(prevEdges => addEdge(params, prevEdges)),
  //   [setEdges]
  // )

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}
