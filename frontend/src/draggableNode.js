const nodeIcons = {
  customInput: '→',
  customOutput: '←',
  llm: '🧠',
  text: 'T',
  filter: '⚡',
  transform: '⟳',
  merge: '⋈',
  api: '⇌',
  condition: '?',
};

const nodeColors = {
  customInput: '#10b981',
  customOutput: '#f43f5e',
  llm: '#6366f1',
  text: '#f59e0b',
  filter: '#06b6d4',
  transform: '#a855f7',
  merge: '#ec4899',
  api: '#14b8a6',
  condition: '#f97316',
};

export const DraggableNode = ({ type, label }) => {
  const color = nodeColors[type] || '#6366f1';
  const icon = nodeIcons[type] || '◆';

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.opacity = '0.7';
  };

  return (
    <div
      className={type}
      onDragStart={e => onDragStart(e, type)}
      onDragEnd={e => e.target.style.opacity = '1'}
      draggable
      style={{
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        background: `${color}18`,
        border: `1px solid ${color}44`,
        borderRadius: '8px',
        transition: 'all 0.15s',
        userSelect: 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.background = `${color}28`}
      onMouseLeave={e => e.currentTarget.style.background = `${color}18`}
    >
      <span style={{ fontSize: '14px', color }}>{icon}</span>
      <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 500 }}>{label}</span>
    </div>
  );
};
