import React, { useCallback, useState } from "react"
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from "reactflow"
import { Box } from "@mui/material"
import { useForm } from "react-hook-form"
import FormInput from "./FormInput"
import "reactflow/dist/style.css"

export default function MainMindMap() {
  const [dataSubmit, setDataSubmit] = useState("")
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { positionX, positionY, label, source, target } = dataSubmit

  const onSubmit = data => {
    setDataSubmit(data)
    onEdgesChange()
    onNodesChange()
    reset()
  }

  const initialNodes = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: "Mind map" },
      type: "input"
    }
  ]

  const initialEdges = []

  const [nodes, setNodes] = useNodesState(initialNodes)
  const [edges, setEdges] = useEdgesState(initialEdges)

  const onNodesChange = useCallback(() => {
    if (!dataSubmit) return

    const newNode = {
      id: `${nodes.length + 1}`,
      position: {
        x: positionX,
        y: positionY
      },
      data: { label: label }
    }
    setNodes(prevNodes => [...prevNodes, newNode])
  }, [positionX, positionY, label, setNodes, nodes.length, dataSubmit])

  const onEdgesChange = useCallback(() => {
    if (!dataSubmit) return

    const newEdge = {
      id: `e${edges.length - edges.length + 1}`,
      source: { source },
      target: { target },
      type: "smoothstep"
    }
    setEdges(prevEdges => [...prevEdges, newEdge])
  }, [edges, source, target, setEdges, dataSubmit])

  const onConnect = useCallback(
    params => setEdges(prevEdges => addEdge(params, prevEdges)),
    [setEdges]
  )

  const connectionLineStyle = {
    stroke: "#9999",
    strokeWidth: 3
  }
  const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" }

  return (
    <Box
      component="div"
      sx={{ display: "flex", position: "relative" }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineStyle={connectionLineStyle}
        style={{ width: "100vw" }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <FormInput
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </Box>
  )
}
