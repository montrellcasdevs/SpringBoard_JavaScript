class BubbleSort {
  constructor(array) {  //each new object gets the array to sort
    this.array = array;
  }

  sort() { //Sorting algorithms
    let arr = this.array;
    // Copy to avoid mutating original
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

// Result:
const nums = new BubbleSort([4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34,23, 2, 453, 546, 75, 67, 4342, 32]);
console.log(nums.sort());