const graph = {
    a: ['c', 'b'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: [],
};

const bfs = (graph, startingNode) => {
    const q = [startingNode];
    while (q.length > 0) {
        const current = q.shift();
        console.log(current);
        q.push(...graph[current]);
    }
};

const dfs = (graph, startingNode) => {
    const stack = [startingNode];
    while (stack.length > 0) {
        const current = stack.pop();
        console.log(current);
        stack.push(...graph[current]);
    }
};

const dfsRe = (graph, startingNode) => {
    console.log(startingNode);
    for (let neighbor of graph[startingNode]) {
        dfsRe(graph, neighbor);
    }
};
