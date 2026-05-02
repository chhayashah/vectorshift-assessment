import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [sep, setSep] = useState(data?.separator || ' ');
  return (
    <BaseNode
      id={id} title="Merge" colorKey="merge"
      inputs={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }, { id: 'c', label: 'C' }]}
      outputs={[{ id: 'merged', label: 'Merged' }]}
      fields={[
        { type: 'text', key: 'sep', label: 'Separator', value: sep, onChange: e => setSep(e.target.value), placeholder: 'e.g. space or comma' },
      ]}
    />
  );
};
