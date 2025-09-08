/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    function helper(node) {
      if (!node) return Infinity;
      if (!node.left && !node.right) return 1;
      return 1 + Math.min(helper(node.left), helper(node.right));
    }
    return helper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    function helper(node) {
      if (!node) return 0;
      return 1 + Math.max(helper(node.left), helper(node.right));
    }
    return helper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let max = -Infinity;
    function helper(node) {
      if (!node) return 0;
      const left = Math.max(helper(node.left), 0);
      const right = Math.max(helper(node.right), 0);
      max = Math.max(max, node.val + left + right);
      return node.val + Math.max(left, right);
    }
    helper(this.root);
    return max === -Infinity ? 0 : max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
    let result = null;
    function traverse(node) {
      if (!node) return;
      if (node.val > lowerBound && (result === null || node.val < result)) {
        result = node.val;
      }
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root || node1 === this.root || node2 === this.root) return false;
    function find(node, target, depth = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { depth, parent };
      return find(node.left, target, depth + 1, node) || find(node.right, target, depth + 1, node);
    }
    const info1 = find(this.root, node1);
    const info2 = find(this.root, node2);
    return info1 && info2 && info1.depth === info2.depth && info1.parent !== info2.parent;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    function helper(node) {
      if (!node) return '#';
      return `${node.val},${helper(node.left)},${helper(node.right)}`;
    }
    return helper(tree.root);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const values = stringTree.split(',');
    function helper() {
      const val = values.shift();
      if (val === '#' || val === undefined) return null;
      const node = new BinaryTreeNode(Number(val));
      node.left = helper();
      node.right = helper();
      return node;
    }
    return new BinaryTree(helper());
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    function helper(node) {
      if (!node || node === node1 || node === node2) return node;
      const left = helper(node.left);
      const right = helper(node.right);
      if (left && right) return node;
      return left || right;
    }
    return helper(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
