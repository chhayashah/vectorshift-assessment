import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id} title="LLM" colorKey="llm"
    inputs={[{ id: 'system', label: 'System' }, { id: 'prompt', label: 'Prompt' }]}
    outputs={[{ id: 'response', label: 'Response' }]}
    fields={[{ type: 'info', key: 'info', value: 'Large Language Model — connects to system prompt and user prompt, outputs a response.' }]}
  />
);
