import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import { TextField, Box } from "@mui/material";
import "reactflow/dist/style.css";
import { Handle, Position } from "reactflow";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";
import {
  useDeleteMapItemMutation,
  useEditMapItemMutation,
  useGetAllMapItemsQuery,
} from "../store/Features/mapItem/mapItemApiSlice";
import { toast } from "react-toastify";

const handleStyle = { left: 10 };

export default function MainMindMap() {
  const { data } = useGetAllMapItemsQuery("mapItems", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let item = {
    id: "1",
    source: "1",
    x: "200",
    y: "300",
    label: "First",
    target: "2",
    lineId: "el-1",
  };

  let initialNodes = [
    {
      id: "1",
      position: { x: 50, y: 0 },
      data: { item },
      type: "customNodes",
    },
    {
      id: "2",
      position: { x: 0, y: 100 },
      data: { item },
      type: "customNodes",
    },
    {
      id: "3",
      position: { x: 100, y: 200 },
      data: { item },
      type: "customNodes",
    },
    {
      id: "4",
      position: { x: 100, y: 300 },
      data: { item },
      type: "customNodes",
    },
  ];
  let initialEdges = [
    { id: "e1-2", source: "1", target: "4" },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e1-4", source: "2", target: "4" },
  ];

  // let initialNodes = [];
  // let initialEdges = [];

  const nodeTypes = useMemo(() => ({ customNodes: CustomNodes }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const computeNodes = useCallback(() => {
    if (data) {
      const { entities } = data;
      const mapItems = Object.values(entities);

      const theInitialNodes = mapItems.map((item) => {
        return {
          id: item.id,
          position: { x: item.x, y: item.y },
          data: { item: item },
          type: "customNodes",
        };
      });

      initialNodes = [...theInitialNodes];

      setNodes(theInitialNodes);
    }
  }, [setNodes]);

  const computeEdges = useCallback(() => {
    const { entities } = data;
    const mapItems = Object.values(entities);

    const theInitialEdges = mapItems.map((item) => {
      return { id: item.lineId, source: item.source, target: item.target };
    });
    initialEdges = [...theInitialEdges];

    setEdges(theInitialEdges);
  }, [setEdges]);

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
        onNodesChange={computeNodes}
        onEdgesChange={computeEdges}
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
  const { item } = data;
  const { id, source, x, y, label, target, lineId } = item;

  const [deleteMapItem] = useDeleteMapItemMutation();
  const [editMapItem] = useEditMapItemMutation();

  const handleEdit = useCallback(() => {
    setShow(!show);
  }, [show]);

  const handleCheck = useCallback(() => {}, []);

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

            {/* build form here. They can change source, x,y, and label. Source will be a drop down */}
            <GiCheckMark
              style={{
                position: "absolute",
                right: "15px",
                top: "25px",
                cursor: "pointer",
              }}
              color="black"
              size="1rem"
              onClick={async (e) => {
                try {
                  const newLabel = e.target.value;
                  // handleEditNode(item.id, { label: newLabel })

                  const res = await editMapItem({
                    id,
                    source,
                    target,
                    x: Number(x),
                    y: Number(y),
                    label,
                    lineId,
                  }).unwrap();

                  setShow(false);
                  toast.success(`${res.data.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });

                  setTimeout(() => {
                    window.location.reload();
                  }, 5000);
                } catch (error) {}
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
            size="0.7rem"
            onClick={handleEdit}
            style={{
              cursor: "pointer",
            }}
          />
          <p>{label}</p>
          <MdDeleteOutline
            color="black"
            size="0.7rem"
            onClick={async () => {
              try {
                const res = await deleteMapItem({ id }).unwrap();

                toast.success(`${res.message}`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });

                setTimeout(() => {
                  window.location.reload();
                }, 5000);
              } catch (error) {
                let msg =
                  error.message ||
                  (error.data && error.data.message) ||
                  "An error occurred";
                toast.error(`${msg}`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
            }}
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
