import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [expr, setExpr] = useState(data?.expr || '');
  return (
    <BaseNode
      id={id} title="Condition" colorKey="condition"
      inputs={[{ id: 'value', label: 'Value' }]}
      outputs={[{ id: 'true', label: 'True' }, { id: 'false', label: 'False' }]}
      fields={[
        { type: 'text', key: 'expr', label: 'Expression', value: expr, onChange: e => setExpr(e.target.value), placeholder: 'e.g. x === "yes"' },
        { type: 'info', key: 'hint', value: 'Routes to True or False output based on evaluated expression.' },
      ]}
    />
  );
};
