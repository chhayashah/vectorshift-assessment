import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [op, setOp] = useState(data?.op || 'uppercase');
  return (
    <BaseNode
      id={id} title="Transform" colorKey="transform"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'output', label: 'Output' }]}
      fields={[
        { type: 'select', key: 'op', label: 'Operation', value: op, onChange: e => setOp(e.target.value),
          options: [
            { value: 'uppercase', label: 'Uppercase' },
            { value: 'lowercase', label: 'Lowercase' },
            { value: 'trim', label: 'Trim' },
            { value: 'reverse', label: 'Reverse' },
            { value: 'json_parse', label: 'JSON Parse' },
          ]
        },
      ]}
    />
  );
};
