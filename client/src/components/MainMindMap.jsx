import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import { Typography, TextField, Box } from "@mui/material";
import "reactflow/dist/style.css";
import { Handle, Position } from "reactflow";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";
import { useGetAllMapItemsQuery } from "../store/Features/mapItem/mapItemApiSlice";

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

const handleStyle = { left: 10 };

export default function MainMindMap() {
  const { data } = useGetAllMapItemsQuery("mapItems", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  // const initialNodes = [
  //   {
  //     id: "1",
  //     position: { x: 50, y: 0 },
  //     data: { label: "First" },
  //     type: "customNodes",
  //   },
  //   {
  //     id: "2",
  //     position: { x: 0, y: 100 },
  //     data: { label: "Second" },
  //     type: "customNodes",
  //   },
  //   {
  //     id: "3",
  //     position: { x: 100, y: 200 },
  //     data: { label: "Third" },
  //     type: "customNodes",
  //   },
  //   {
  //     id: "4",
  //     position: { x: 100, y: 300 },
  //     data: { label: "Fourth" },
  //     type: "customNodes",
  //   },
  // ];
  // const initialEdges = [
  //   { id: "e1-2", source: "1", target: "4" },
  //   { id: "e1-3", source: "1", target: "3" },
  //   { id: "e1-4", source: "2", target: "4" },
  // ];

  let initialNodes = [];
  let initialEdges = [];

  if (data) {
    const { entities } = data;
    const mapItems = Object.values(entities);

    const theInitialNodes = mapItems.map((item) => {
      return {
        id: item.id,
        position: { x: item.x, y: item.y },
        data: { label: item.label },
        type: "customNodes",
      };
    });

    const theInitialEdges = mapItems.map((item) => {
      return { id: item.lineId, source: item.source, target: item.target };
    });

    initialNodes = [...theInitialNodes];
    initialEdges = [...theInitialEdges];
  }

  const nodeTypes = useMemo(() => ({ customNodes: CustomNodes }), []);
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
  // const initialNodes = [
  //   { id: "1", position: { x: 50, y: 0 }, data: { label: "First" } },in
  //   { id: "2", position: { x: 0, y: 100 }, data: { label: "Second" } },
  //   { id: "3", position: { x: 0, y: 200 }, data: { label: "Third" } },
  //   { id: "4", position: { x: 300, y: 200 }, data: { label: "Fourth" } },
  //   { id: "5", position: { x: 500, y: 400 }, data: { label: "Fivth" } },
  // ];
  // const initialEdges = [
  //   { id: "e1-1", source: "0", target: "0" },
  //   { id: "e1-2", source: "1", target: "2" },
  //   { id: "e1-3", source: "2", target: "3" },
  //   { id: "e1-4", source: "2", target: "4" },
  //   { id: "e1-5", source: "3", target: "5" },
  // ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

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
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

function CustomNodes({ data, isConnectable }) {
  const [show, setShow] = useState(false);
  const { label } = data; // Destructure label from the data prop

  // Now you can use the label variable wherever you need it in your component
  console.log(label);
  const handleEdit = useCallback(() => {
    setShow(!show);
  }, [show]);

  const handleDelete = useCallback(() => {
    // Implement delete functionality here
  }, []);

  const handleCheck = useCallback(() => {
    // Implement check functionality here
  }, []);

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Box
      sx={{
        border: "2px solid black",
        width: "150px",
        background: "white",
        borderRadius: "10px",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box sx={{ width: "100%" }}>
        {show && (
          <Box>
            <TextField
              type="text"
              style={{ width: "100%", position: "relative" }}
            />
            <GiCheckMark
              style={{
                position: "absolute",
                right: "15px",
                top: "25px",
                cursor: "pointer",
              }}
              color="black"
              size="1rem"
              onClick={(e) => {
                const newLabel = e.target.value;
                // handleEditNode(item.id, { label: newLabel })
                setShow(false);
              }}
            />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <FiEdit
            color="black"
            size="1rem"
            onClick={handleEdit}
            style={{
              cursor: "pointer",
            }}
          />
          <p>{label}</p>
          <MdDeleteOutline
            color="black"
            size="1rem"
            // onClick={handleDeleteNode}
            style={{
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </Box>
  );
}
