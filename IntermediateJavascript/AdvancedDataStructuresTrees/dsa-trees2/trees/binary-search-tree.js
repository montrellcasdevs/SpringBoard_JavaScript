class Node {
  constructor(val, left = null, right = null) {
    this.val = val; // The value of the node
    this.left = left; // The left child of the node
    this.right = right; // The right child of the node
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val); //new Node object is created with the value
    if (!this.root) { //newNode is assigned to root if tree is empty
      this.root = newNode;
      return this;
    }
    let current = this.root; //If the tree is empty
    while (true) {
      if (val < current.val) { //If the value is less than the current node's value
        if (!current.left) { //If there is no left child
          current.left = newNode;//newNode is assigned to the left child
          return this; //The tree is returned
        }
        current = current.left; //If there is a left child, move to the left child
      } else {
        if (!current.right) { //If there is no right child
          current.right = newNode; //newNode is assigned to the right child
          return this; //The tree is returned
        }
        current = current.right; //If there is a right child, move to the right child
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) { //
    const insert = (node, val) => { //Helper function to insert values
      if (!node) return new Node(val); //If the current node is null, create a new node
      if (val < node.val) { //If the value is less than the current node's value
        node.left = insert(node.left, val); //Recursively insert into the left subtree
      } else { //If the value is greater than or equal to the current node's value
        node.right = insert(node.right, val); //Recursively insert into the right subtree
      }
      return node; //Return the current node
    };
    this.root = insert(this.root, val);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root; //Start at the root
    while (current) { //While there is a current node
      if (current.val === val) return current; //If the current node's value matches the search value, return the current node
      if (val < current.val) {//If the value is less than the current node's value
        current = current.left; //If there is a left child, move to the left child
      } else { //If the value is greater than or equal to the current node's value
        current = current.right; //If there is a right child, move to the right child
      }
    }
    return undefined; //If the value is not found, return undefined
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const find = (node, val) => {
      if (!node) return undefined; //If the current node is null, return undefined
      if (node.val === val) return node; //If the current node's value matches the search value, return the current node
      if (val < node.val) {//If the value is less than the current node's value
        return find(node.left, val); //If the value is less than the current node's value, search the left subtree
      } else { //If the value is greater than or equal to the current node's value
        return find(node.right, val); //Search the right subtree
      }
    };
    return find(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() { //Pre-order DFS
    const result = [];
    const traverse = (node) => {
      if (!node) return; //If the current node is null, return
      result.push(node.val); //Add the current node's value to the result
      traverse(node.left); //Recursively traverse the left subtree
      traverse(node.right); //Recursively traverse the right subtree
    };
    traverse(this.root); //Start the traversal at the root
    return result; //Return the array of visited nodes
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left); //Recursively traverse the left subtree
      result.push(node.val); //Add the current node's value to the result
      traverse(node.right); //Recursively traverse the right subtree
    };
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() { //Post-order DFS
    const result = []; 
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left); //Recursively traverse the left subtree
      traverse(node.right); //Recursively traverse the right subtree
      result.push(node.val); //Add the current node's value to the result
    };
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift();
      if (current) {
        result.push(current.val); //Add the current node's value to the result
        queue.push(current.left); //Add the left child to the queue
        queue.push(current.right); //Add the right child to the queue
      }
    }
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const removeNode = (node, val) => {
      if (!node) return null;
      if (val === node.val) {
        // Node to be removed found
        if (!node.left && !node.right) {
          // Case 1: No children
          return null;
        }
        if (!node.left) {
          // Case 2: One child (right)
          return node.right; // Return the right child
        }
        if (!node.right) {
          // Case 2: One child (left)
          return node.left;
        }
        // Case 3: Two children
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.val = minRight.val;
        node.right = removeNode(node.right, minRight.val);
        return node;
      }
      if (val < node.val) {
        node.left = removeNode(node.left, val);
      } else {
        node.right = removeNode(node.right, val);
      }
      return node;
    };
    this.root = removeNode(this.root, val);
    return this;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const checkBalance = (node) => {
      if (!node) return 0;
      const leftHeight = checkBalance(node.left);
      const rightHeight = checkBalance(node.right);
      if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }
      return Math.max(leftHeight, rightHeight) + 1;
    };
    return checkBalance(this.root) !== -1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    let current = this.root; // Start at the root
    let parent = null;

    while (current) { // Find the rightmost node
      parent = current;
      current = current.right;
    }

    if (parent && parent.left) { // If the parent has a left child
      current = parent.left;
      while (current.right) {
        current = current.right;
      }
      return current.val;
    }

    return undefined;
  }
}

//module.exports = BinarySearchTree;
