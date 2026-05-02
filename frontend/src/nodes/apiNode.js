import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');
  return (
    <BaseNode
      id={id} title="API Call" colorKey="api"
      inputs={[{ id: 'body', label: 'Body' }, { id: 'headers', label: 'Headers' }]}
      outputs={[{ id: 'response', label: 'Response' }, { id: 'error', label: 'Error' }]}
      fields={[
        { type: 'select', key: 'method', label: 'Method', value: method, onChange: e => setMethod(e.target.value),
          options: ['GET','POST','PUT','DELETE','PATCH'].map(m => ({ value: m, label: m })) },
        { type: 'text', key: 'url', label: 'URL', value: url, onChange: e => setUrl(e.target.value), placeholder: 'https://api.example.com/...' },
      ]}
    />
  );
};
