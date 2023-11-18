const connectedComponentsCount = (graph) => {
    // todo
    let count = 0;
    const visted = new Set();
    for (let node in graph) {
        count++;
        countConnectedComponents(graph, node, visted);
    }
    return count;
};

const countConnectedComponents = (graph, src, visited) => {
    const q = [src];
    while (q.length > 0) {
        const current = q.shift();
        if (!visited.has(current)) {
            visited.add(+current);
            for (neighbor of graph[current]) {
                if (!visited.has(neighbor)) {
                    q.push(neighbor);
                }
            }
        }
    }
};

module.exports = {
    connectedComponentsCount,
};
