import { DraggableNode } from './draggableNode';

const nodes = [
  { type: 'customInput', label: 'Input' },
  { type: 'llm', label: 'LLM' },
  { type: 'customOutput', label: 'Output' },
  { type: 'text', label: 'Text' },
  { type: 'filter', label: 'Filter' },
  { type: 'transform', label: 'Transform' },
  { type: 'merge', label: 'Merge' },
  { type: 'api', label: 'API Call' },
  { type: 'condition', label: 'Condition' },
];

export const PipelineToolbar = () => (
  <div style={{
    background: '#111318',
    borderBottom: '1px solid #1e2333',
    padding: '12px 20px',
  }}>
    <div style={{ fontSize: '10px', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', fontFamily: "'Space Mono', monospace" }}>
      Nodes — drag to canvas
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {nodes.map(n => <DraggableNode key={n.type} type={n.type} label={n.label} />)}
    </div>
  </div>
);
