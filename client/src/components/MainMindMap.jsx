import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useGetAllMapItemsQuery } from "../store/Features/mapItem/mapItemApiSlice";

export default function MainMindMap({ dataSubmit }) {
  const { data: mapItems, isLoading } = useGetAllMapItemsQuery("mapItems", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  console.log(mapItems, isLoading);
  const initialNodes = [
    { id: "1", position: { x: 50, y: 0 }, data: { label: "First" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "Second" } },
    { id: "3", position: { x: 100, y: 200 }, data: { label: "Third" } },
    { id: "4", position: { x: 100, y: 300 }, data: { label: "Fourth" } },
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "4" },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e1-4", source: "2", target: "4" },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

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
  );
}
