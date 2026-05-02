from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag = check_is_dag(nodes, edges)
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}

def check_is_dag(nodes, edges):
    node_ids = {n['id'] for n in nodes}
    adj = {nid: [] for nid in node_ids}
    for edge in edges:
        src = edge.get('source')
        tgt = edge.get('target')
        if src in adj and tgt in node_ids:
            adj[src].append(tgt)

    in_degree = {nid: 0 for nid in node_ids}
    for nid in node_ids:
        for neighbor in adj[nid]:
            in_degree[neighbor] += 1

    queue = [nid for nid in node_ids if in_degree[nid] == 0]
    visited = 0
    while queue:
        node = queue.pop(0)
        visited += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids) if len(node_ids) > 0 else True
