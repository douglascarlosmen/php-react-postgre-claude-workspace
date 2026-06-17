# Requires Python 3.10+
pip install graphifyy && graphify install

# Build a knowledge graph for any project folder
/graphify ./raw

# Outputs land in graphify-out/
graphify-out/
├── graph.html        # interactive visualization
├── GRAPH_REPORT.md   # core nodes, surprises, suggested questions
├── graph.json        # persistent, queryable graph
└── cache/            # incremental cache