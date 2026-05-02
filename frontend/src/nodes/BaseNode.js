// BaseNode.js — abstraction for all node types
import { Handle, Position } from 'reactflow';
import { useState } from 'react';

const nodeColors = {
  input:    { accent: '#10b981', label: '#10b981' },
  output:   { accent: '#f43f5e', label: '#f43f5e' },
  llm:      { accent: '#6366f1', label: '#818cf8' },
  text:     { accent: '#f59e0b', label: '#fbbf24' },
  filter:   { accent: '#06b6d4', label: '#22d3ee' },
  transform:{ accent: '#a855f7', label: '#c084fc' },
  merge:    { accent: '#ec4899', label: '#f472b6' },
  condition:{ accent: '#f97316', label: '#fb923c' },
  api:      { accent: '#14b8a6', label: '#2dd4bf' },
  default:  { accent: '#6366f1', label: '#818cf8' },
};

const styles = {
  node: (accent) => ({
    background: '#13161e',
    border: `1px solid ${accent}44`,
    borderRadius: '10px',
    minWidth: '200px',
    boxShadow: `0 0 0 1px ${accent}22, 0 8px 24px rgba(0,0,0,0.4)`,
    overflow: 'hidden',
    fontFamily: "'Inter', sans-serif",
  }),
  header: (accent) => ({
    background: `linear-gradient(90deg, ${accent}22 0%, transparent 100%)`,
    borderBottom: `1px solid ${accent}33`,
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }),
  dot: (accent) => ({
    width: 8, height: 8, borderRadius: '50%', background: accent, flexShrink: 0,
  }),
  title: (color) => ({
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color,
    fontFamily: "'Space Mono', monospace",
  }),
  body: { padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' },
  field: { display: 'flex', flexDirection: 'column', gap: '3px' },
  label: { fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' },
  input: (accent) => ({
    background: '#0d1017',
    border: `1px solid #2a2f3d`,
    borderRadius: '5px',
    padding: '5px 8px',
    color: '#e2e8f0',
    fontSize: '12px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.15s',
  }),
  select: (accent) => ({
    background: '#0d1017',
    border: '1px solid #2a2f3d',
    borderRadius: '5px',
    padding: '5px 8px',
    color: '#e2e8f0',
    fontSize: '12px',
    width: '100%',
    outline: 'none',
  }),
  info: {
    fontSize: '11px',
    color: '#64748b',
    fontStyle: 'italic',
    lineHeight: 1.5,
  },
};

/**
 * BaseNode — generic node renderer.
 *
 * @param {object} props
 * @param {string}   props.id           - node id from ReactFlow
 * @param {string}   props.title        - displayed node title
 * @param {string}   props.colorKey     - key into nodeColors map
 * @param {Array}    props.inputs        - [{id, label, style?}] left-side handles
 * @param {Array}    props.outputs       - [{id, label, style?}] right-side handles
 * @param {Array}    props.fields        - field descriptors rendered in body:
 *                     { type: 'text'|'select'|'textarea'|'info', key, label, value, onChange, options, placeholder, rows }
 * @param {ReactNode} props.children     - optional extra content
 * @param {object}   props.style        - extra style for outer wrapper
 */
export const BaseNode = ({ id, title, colorKey = 'default', inputs = [], outputs = [], fields = [], children, style }) => {
  const colors = nodeColors[colorKey] || nodeColors.default;
  const accent = colors.accent;

  return (
    <div style={{ ...styles.node(accent), ...style }}>
      {/* Left handles */}
      {inputs.map((h, i) => (
        <Handle
          key={h.id}
          type="target"
          position={Position.Left}
          id={`${id}-${h.id}`}
          style={{
            top: inputs.length === 1 ? '50%' : `${(100 / (inputs.length + 1)) * (i + 1)}%`,
            ...h.style,
          }}
          title={h.label}
        />
      ))}

      {/* Header */}
      <div style={styles.header(accent)}>
        <span style={styles.dot(accent)} />
        <span style={styles.title(colors.label)}>{title}</span>
      </div>

      {/* Handle labels (inputs) */}
      {inputs.length > 1 && (
        <div style={{ position: 'relative', pointerEvents: 'none' }}>
          {inputs.map((h, i) => (
            <div
              key={h.id}
              style={{
                position: 'absolute',
                left: '12px',
                top: 0,
                fontSize: '9px',
                color: '#475569',
                transform: `translateY(${(i - (inputs.length - 1) / 2) * 18}px)`,
              }}
            >
              {h.label}
            </div>
          ))}
        </div>
      )}

      {/* Body */}
      <div style={styles.body}>
        {fields.map((f) => {
          if (f.type === 'info') {
            return (
              <div key={f.key} style={styles.info}>{f.value}</div>
            );
          }
          if (f.type === 'textarea') {
            return (
              <div key={f.key} style={styles.field}>
                {f.label && <span style={styles.label}>{f.label}</span>}
                <textarea
                  value={f.value}
                  onChange={f.onChange}
                  placeholder={f.placeholder}
                  rows={f.rows || 3}
                  style={{
                    ...styles.input(accent),
                    resize: 'vertical',
                    lineHeight: 1.5,
                  }}
                  onFocus={e => e.target.style.borderColor = accent}
                  onBlur={e => e.target.style.borderColor = '#2a2f3d'}
                />
              </div>
            );
          }
          if (f.type === 'select') {
            return (
              <div key={f.key} style={styles.field}>
                {f.label && <span style={styles.label}>{f.label}</span>}
                <select
                  value={f.value}
                  onChange={f.onChange}
                  style={styles.select(accent)}
                >
                  {(f.options || []).map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            );
          }
          // default: text input
          return (
            <div key={f.key} style={styles.field}>
              {f.label && <span style={styles.label}>{f.label}</span>}
              <input
                type="text"
                value={f.value}
                onChange={f.onChange}
                placeholder={f.placeholder}
                style={styles.input(accent)}
                onFocus={e => e.target.style.borderColor = accent}
                onBlur={e => e.target.style.borderColor = '#2a2f3d'}
              />
            </div>
          );
        })}
        {children}
      </div>

      {/* Right handles */}
      {outputs.map((h, i) => (
        <Handle
          key={h.id}
          type="source"
          position={Position.Right}
          id={`${id}-${h.id}`}
          style={{
            top: outputs.length === 1 ? '50%' : `${(100 / (outputs.length + 1)) * (i + 1)}%`,
            ...h.style,
          }}
          title={h.label}
        />
      ))}
    </div>
  );
};
