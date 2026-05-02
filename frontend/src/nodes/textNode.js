import { useState, useRef, useEffect, useCallback } from "react";
import { Handle, Position } from "reactflow";

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
const MIN_W = 220;
const accent = "#f59e0b";

function extractVars(text) {
  const vars = [];
  const seen = new Set();
  let m;
  VARIABLE_REGEX.lastIndex = 0;
  while ((m = VARIABLE_REGEX.exec(text)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      vars.push(m[1]);
    }
  }
  return vars;
}

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const [nodeW, setNodeW] = useState(MIN_W);
  const taRef = useRef(null);

  const vars = extractVars(text);

  const resize = useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.max(ta.scrollHeight, 60) + "px";
    const lines = text.split("\n");
    const longest = Math.max(...lines.map((l) => l.length));
    const estimated = Math.max(MIN_W, Math.min(longest * 7.5 + 40, 500));
    setNodeW((w) => (Math.abs(w - estimated) > 5 ? estimated : w));
  }, [text]);

  useEffect(() => {
    resize();
  }, [text]);

  return (
    <div
      style={{
        background: "#13161e",
        border: `1px solid ${accent}55`,
        borderRadius: "10px",
        width: nodeW,
        minWidth: MIN_W,
        boxShadow: `0 0 0 1px ${accent}22, 0 8px 24px rgba(0,0,0,0.4)`,
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        transition: "width 0.1s ease",
      }}
    >
      {vars.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-var-${v}`}
          style={{ top: `${(100 / (vars.length + 1)) * (i + 1)}%` }}
          title={v}
        />
      ))}

      {vars.map((v, i) => (
        <div
          key={v}
          style={{
            position: "absolute",
            left: 14,
            top: `${(100 / (vars.length + 1)) * (i + 1)}%`,
            transform: "translateY(-50%)",
            fontSize: "9px",
            color: accent,
            background: "#13161e",
            padding: "1px 4px",
            borderRadius: 3,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            fontFamily: "'Space Mono', monospace",
            zIndex: 10,
          }}
        >
          {v}
        </div>
      ))}

      <div
        style={{
          background: `linear-gradient(90deg, ${accent}22 0%, transparent 100%)`,
          borderBottom: `1px solid ${accent}33`,
          borderRadius: "10px 10px 0 0",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: accent,
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fbbf24",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          Text
        </span>
        {vars.length > 0 && (
          <span
            style={{
              marginLeft: "auto",
              fontSize: "9px",
              color: accent,
              background: `${accent}22`,
              padding: "2px 6px",
              borderRadius: 10,
            }}
          >
            {vars.length} var{vars.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div style={{ padding: "10px 12px" }}>
        <div
          style={{
            fontSize: "10px",
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 6,
          }}
        >
          Content
        </div>
        <textarea
          ref={taRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text or use {{variable}}"
          style={{
            background: "#0d1017",
            border: "1px solid #2a2f3d",
            borderRadius: "5px",
            padding: "6px 8px",
            color: "#e2e8f0",
            fontSize: "12px",
            width: "100%",
            resize: "none",
            lineHeight: 1.6,
            outline: "none",
            fontFamily: "'Inter', sans-serif",
            overflow: "hidden",
            display: "block",
            minHeight: 60,
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = "#2a2f3d")}
        />
        {vars.length > 0 && (
          <div
            style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}
          >
            {vars.map((v) => (
              <span
                key={v}
                style={{
                  fontSize: "9px",
                  color: "#0d1017",
                  background: accent,
                  padding: "1px 6px",
                  borderRadius: 10,
                  fontFamily: "'Space Mono', monospace",
                }}
              >{`{{${v}}}`}</span>
            ))}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: "50%" }}
      />
    </div>
  );
};
