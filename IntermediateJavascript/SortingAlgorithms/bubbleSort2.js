class BubbleSort {
  constructor(array) { 
    this.array = array;
  }

  sort() {
    let arr = this.array;
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

// Example usage:
const sorter = new BubbleSort([5, 2, 9, 1, 5, 8]);
console.log(sorter.sort()); // Output: [1, 2, 5, 5, 8, 9]