import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "#0a0c10",
      }}
    >
      <div
        style={{
          background: "#0d0f14",
          borderBottom: "1px solid #1e2333",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontFamily: "'Space Mono', monospace",
            color: "#818cf8",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Vector<span style={{ color: "#e2e8f0" }}>Shift</span>
        </span>
        <span
          style={{
            fontSize: "10px",
            color: "#334155",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          // pipeline builder
        </span>
      </div>
      <div style={{ flexShrink: 0 }}>
        <PipelineToolbar />
      </div>
      <PipelineUI />
      <div style={{ flexShrink: 0 }}>
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
