import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { useShallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { FilterNode } from "./nodes/filterNode";
import { TransformNode } from "./nodes/transformNode";
import { MergeNode } from "./nodes/mergeNode";
import { APINode } from "./nodes/apiNode";
import { ConditionNode } from "./nodes/conditionNode";
import "reactflow/dist/style.css";

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  transform: TransformNode,
  merge: MergeNode,
  api: APINode,
  condition: ConditionNode,
};

const selector = (s) => ({
  nodes: s.nodes,
  edges: s.edges,
  getNodeID: s.getNodeID,
  addNode: s.addNode,
  onNodesChange: s.onNodesChange,
  onEdgesChange: s.onEdgesChange,
  onConnect: s.onConnect,
});

const EmptyState = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      zIndex: 1,
    }}
  >
    <div
      style={{
        border: "2px dashed #1e2333",
        borderRadius: "16px",
        padding: "40px 60px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: 12 }}>⬡</div>
      <div
        style={{
          fontSize: "14px",
          color: "#334155",
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        Canvas is empty
      </div>
      <div style={{ fontSize: "12px", color: "#1e2d3d" }}>
        Drag nodes from the toolbar above to start building your pipeline
      </div>
    </div>
  </div>
);

export const PipelineUI = () => {
  const wrapper = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(useShallow(selector));

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const bounds = wrapper.current.getBoundingClientRect();
      const raw = event?.dataTransfer?.getData("application/reactflow");
      if (!raw) return;
      const { nodeType: type } = JSON.parse(raw);
      if (!type) return;
      const position = rfInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
      const nodeID = getNodeID(type);
      addNode({
        id: nodeID,
        type,
        position,
        data: { id: nodeID, nodeType: type },
      });
    },
    [rfInstance],
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div ref={wrapper} style={{ flex: 1, minHeight: 0, position: "relative" }}>
      {nodes.length === 0 && <EmptyState />}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        snapGrid={[20, 20]}
        connectionLineType="smoothstep"
        style={{ width: "100%", height: "100%", background: "#0a0c10" }}
      >
        <Background color="#1e2333" gap={20} size={1} />
        <Controls />
        <MiniMap
          nodeColor={(n) => {
            const map = {
              customInput: "#10b981",
              customOutput: "#f43f5e",
              llm: "#6366f1",
              text: "#f59e0b",
              filter: "#06b6d4",
              transform: "#a855f7",
              merge: "#ec4899",
              api: "#14b8a6",
              condition: "#f97316",
            };
            return map[n.type] || "#6366f1";
          }}
          style={{ background: "#111318", border: "1px solid #1e2333" }}
        />
      </ReactFlow>
    </div>
  );
};
