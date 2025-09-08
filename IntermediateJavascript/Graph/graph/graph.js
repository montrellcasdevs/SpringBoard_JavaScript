class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }
  //ADD
  // this function accepts a Node instance and adds it to the nodes property on the graph -ADD
  addVertex(vertex) {
    this.nodes.add(vertex);//adding the vertex
  }
  //ADD ARRAYS
  // this function accepts an array of Node instances and adds them to the nodes property on the graph 
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {//adds the array to the vertex
      this.addVertex(vertex);
    }
  }

  //--UPDATE
  // this function accepts two vertices and updates their adjacent values to include the other vertex 
  addEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    }
  }
  //DELETE
  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    }
  }
  //DELETE
  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (this.nodes.has(vertex)) {
      for (let adj of vertex.adjacent) {
        adj.adjacent.delete(vertex);
      }
      this.nodes.delete(vertex);
    }
  }
  // READ /RETURN ARRAY
  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    const dfs = (node) => {
      if (!node || visited.has(node)) return;
      visited.add(node);
      result.push(node.value);
      for (let neighbor of node.adjacent) {
        dfs(neighbor);
      }
    };

    dfs(start);
    return result;
  }
  //READ /RETURN
  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set();
    const result = [];
    const queue = [start];

    while (queue.length) {
      const node = queue.shift();
      if (!node || visited.has(node)) continue;
      visited.add(node);
      result.push(node.value);
      for (let neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

//module.exports = {Graph, Node}
window.Graph = Graph;
window.Node = Node;