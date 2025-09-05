
import{Node}from'./Node.js';
//import { Compare, defaultCompare } from '../util';

// Add this compare function
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}


export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn; // used to compare node values
    this.root = null; // {1} root node of type Node
  }
  insert(key) {
  if (this.root == null) { // {1}
    this.root = new Node(key); // {2}
  } else {
    this.insertNode(this.root, key); // {3}
  }
}
  insertNode(node, key) {
  if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // {4}
    if (node.left == null) { // {5}
      node.left = new Node(key); // {6}
    } else {
      this.insertNode(node.left, key); // {7}
    }
  } else {
    if (node.right == null) { // {8}
      node.right = new Node(key); // {9}
    } else {
      this.insertNode(node.right, key); // {10}
    }
  }
}
}