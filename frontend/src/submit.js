import { useStore } from "./store";
import { useShallow } from "zustand/shallow";
import { useState } from "react";

const selector = (s) => ({ nodes: s.nodes, edges: s.edges });

const Toast = ({ result, onClose }) => {
  if (!result) return null;
  const isDAG = result.is_dag;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#13161e",
        border: `1px solid ${isDAG ? "#10b981" : "#f43f5e"}44`,
        borderRadius: "12px",
        padding: "16px 24px",
        zIndex: 9999,
        boxShadow: `0 8px 32px rgba(0,0,0,0.6)`,
        minWidth: 300,
        fontFamily: "'Inter', sans-serif",
        animation: "fadeSlideUp 0.3s ease forwards",
      }}
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#e2e8f0",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.06em",
          }}
        >
          PIPELINE ANALYSIS
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#475569",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {[
          { label: "Nodes", value: result.num_nodes, color: "#6366f1" },
          { label: "Edges", value: result.num_edges, color: "#818cf8" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              flex: 1,
              background: "#0d1017",
              borderRadius: 8,
              padding: "10px 14px",
              border: "1px solid #1e2333",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color,
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#475569",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginTop: 2,
              }}
            >
              {label}
            </div>
          </div>
        ))}
        <div
          style={{
            flex: 1,
            background: "#0d1017",
            borderRadius: 8,
            padding: "10px 14px",
            border: `1px solid ${isDAG ? "#10b981" : "#f43f5e"}33`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 18, marginBottom: 2 }}>
            {isDAG ? "✅" : "⚠️"}
          </div>
          <div
            style={{
              fontSize: 10,
              color: isDAG ? "#10b981" : "#f43f5e",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontWeight: 600,
            }}
          >
            {isDAG ? "Valid DAG" : "Has Cycle"}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(useShallow(selector));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true); 
    setResult(null);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await res.json();
      setResult(data);
      setTimeout(() => setResult(null), 6000);
    } catch {
      setError("Backend unreachable. Run: uvicorn main:app --reload");
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoading(false); 
    }
  };

  const disabled = loading || nodes.length === 0;

  return (
    <>
      <Toast result={result} onClose={() => setResult(null)} />

      {error && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1a0f10",
            border: "1px solid #f43f5e44",
            borderRadius: 10,
            padding: "12px 20px",
            color: "#f43f5e",
            fontSize: 12,
            zIndex: 9999,
            fontFamily: "'Space Mono', monospace",
            animation: "fadeSlideUp 0.3s ease forwards",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: "12px 24px",
          background: "#0d0f14",
          borderTop: "1px solid #1e2333",
        }}
      >
        
        <span
          style={{
            fontSize: "11px",
            color: "#334155",
            fontFamily: "'Space Mono', monospace",
            minWidth: 120,
            textAlign: "right",
          }}
        >
          {nodes.length} node{nodes.length !== 1 ? "s" : ""} · {edges.length}{" "}
          edge{edges.length !== 1 ? "s" : ""}
        </span>

        <button
          onClick={handleSubmit}
          disabled={disabled}
          style={{
            background: disabled
              ? "#1e2333"
              : "linear-gradient(135deg, #6366f1, #818cf8)",
            border: "none",
            borderRadius: "8px",
            padding: "10px 32px",
            color: disabled ? "#334155" : "#fff",
            fontSize: "13px",
            fontWeight: 600,
            cursor: disabled ? "not-allowed" : "pointer",
            letterSpacing: "0.04em",
            fontFamily: "'Space Mono', monospace",
            boxShadow: disabled ? "none" : "0 4px 15px rgba(99,102,241,0.35)",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: 8,
            minWidth: 160,
            justifyContent: "center",
          }}
        >
          
          {loading && (
            <span
              style={{
                width: 12,
                height: 12,
                border: "2px solid #ffffff33",
                borderTopColor: "#fff",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.7s linear infinite",
              }}
            />
          )}
          {loading ? "Submitting…" : "Submit Pipeline"}
        </button>

        <span style={{ minWidth: 120 }} />
      </div>
    </>
  );
};
