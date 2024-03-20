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
import { useGetAllMapItemsQuery } from "../store/Features/mapItem/mapItemApiSlice"

// const initialNodes = [
//   { id: "1", position: { x: 50, y: 0 }, data: { label: "First" } },
//   { id: "2", position: { x: 0, y: 100 }, data: { label: "Second" } },
//   { id: "3", position: { x: 100, y: 200 }, data: { label: "Third" } },
//   { id: "4", position: { x: 100, y: 300 }, data: { label: "Fourth" } },
// ];
// const initialEdges = [
//   { id: "e1-2", source: "1", target: "4" },
//   { id: "e1-3", source: "1", target: "3" },
//   { id: "e1-4", source: "2", target: "4" },
// ];

export default function MainMindMap() {
  const { data, isLoading } = useGetAllMapItemsQuery("mapItems", {
    pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const { entities } = data

  const mapItems = Object.values(entities)

  console.log({ mapItems })

  const theInitialNodes = mapItems.map(item => {
    return {
      id: item.id,
      position: { x: item.x, y: item.y },
      data: { label: item.label }
    }
  })
  const theInitialEdges = mapItems.map(item => {
    return { id: item.lineId, source: item.source, target: item.target }
  })

  // const initialNodes = [...theInitialNodes];
  // const initialEdges = [...theInitialEdges];

  // const initialNodes = [
  //   { id: "1", position: { x: 50, y: 0 }, data: { label: "First" } },
  //   { id: "2", position: { x: 0, y: 100 }, data: { label: "Second" } },
  //   { id: "3", position: { x: 100, y: 200 }, data: { label: "Third" } },
  //   { id: "4", position: { x: 100, y: 300 }, data: { label: "Fourth" } },
  // ];
  // const initialEdges = [
  //   { id: "e1-2", source: "1", target: "4" },
  //   { id: "e1-3", source: "1", target: "3" },
  //   { id: "e1-4", source: "2", target: "4" },
  // ];
  const initialNodes = [
    { id: "1", position: { x: 50, y: 0 }, data: { label: "First" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "Second" } },
    { id: "3", position: { x: 0, y: 200 }, data: { label: "Third" } },
    { id: "4", position: { x: 300, y: 200 }, data: { label: "Fourth" } },
    { id: "5", position: { x: 500, y: 400 }, data: { label: "Fivth" } }
  ]
  const initialEdges = [
    { id: "e1-1", source: "0", target: "0" },
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "2", target: "3" },
    { id: "e1-4", source: "2", target: "4" },
    { id: "e1-5", source: "3", target: "5" }
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div
      sx={{ display: "flex", position: "relative" }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        style={{ width: "100vw" }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}
