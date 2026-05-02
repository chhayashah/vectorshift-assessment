import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  return (
    <BaseNode
      id={id} title="Filter" colorKey="filter"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[{ id: 'pass', label: 'Pass' }, { id: 'fail', label: 'Fail' }]}
      fields={[
        { type: 'text', key: 'cond', label: 'Condition', value: condition, onChange: e => setCondition(e.target.value), placeholder: 'e.g. value > 0' },
      ]}
    />
  );
};
