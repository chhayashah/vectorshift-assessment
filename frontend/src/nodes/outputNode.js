import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [type, setType] = useState(data?.outputType || 'Text');
  return (
    <BaseNode
      id={id} title="Output" colorKey="output"
      inputs={[{ id: 'value', label: 'Value' }]}
      fields={[
        { type: 'text', key: 'name', label: 'Name', value: name, onChange: e => setName(e.target.value) },
        { type: 'select', key: 'type', label: 'Type', value: type, onChange: e => setType(e.target.value),
          options: [{ value: 'Text', label: 'Text' }, { value: 'Image', label: 'Image' }] },
      ]}
    />
  );
};
