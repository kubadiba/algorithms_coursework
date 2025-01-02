export const tarjanSCC = (nodes, edges) => {
    const graph = {};
    nodes.forEach((node) => (graph[node.id] = []));
    edges.forEach((edge) => graph[edge.from].push(edge.to));

    let index = 0;
    const indexMap = {};
    const lowLink = {};
    const stack = [];
    const onStack = new Set();
    const result = [];

    const strongConnect = (node) => {
        indexMap[node] = lowLink[node] = index++;
        stack.push(node);
        onStack.add(node);

        graph[node].forEach((neighbor) => {
            if (!(neighbor in indexMap)) {
                strongConnect(neighbor);
                lowLink[node] = Math.min(lowLink[node], lowLink[neighbor]);
            } else if (onStack.has(neighbor)) {
                lowLink[node] = Math.min(lowLink[node], indexMap[neighbor]);
            }
        });

        if (lowLink[node] === indexMap[node]) {
            const scc = [];
            let w;
            do {
                w = stack.pop();
                onStack.delete(w);
                scc.push(w);
            } while (w !== node);
            result.push(scc);
        }
    };

    nodes.forEach((node) => {
        if (!(node.id in indexMap)) {
            strongConnect(node.id);
        }
    });

    return result;
};
