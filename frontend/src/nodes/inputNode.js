import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [type, setType] = useState(data?.inputType || 'Text');
  return (
    <BaseNode
      id={id} title="Input" colorKey="input"
      outputs={[{ id: 'value', label: 'Value' }]}
      fields={[
        { type: 'text', key: 'name', label: 'Name', value: name, onChange: e => setName(e.target.value) },
        { type: 'select', key: 'type', label: 'Type', value: type, onChange: e => setType(e.target.value),
          options: [{ value: 'Text', label: 'Text' }, { value: 'File', label: 'File' }] },
      ]}
    />
  );
};
