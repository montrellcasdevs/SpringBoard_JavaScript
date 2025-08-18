class QuickSort {
    constructor(array) {
        this.array = array;
    }

    sort(arr = this.array) {
        if (arr.length <= 1) {
            return arr;
        }
        const pivot = arr[arr.length - 1];
        const left = [];
        const right = [];
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return [...this.sort(left), pivot, ...this.sort(right)];
    }
}

// Example usage:
const sorter1 = new QuickSort([5, 4, 9, 10, 2, 20, 8, 7, 3]);
const sorted1 = sorter1.sort();
console.log(sorted1); // Full sorted array

const sorter2 = new QuickSort([8, 4, 2, 5, 0, 10, 11, 12, 13, 16]);
const sorted2 = sorter2.sort();
console.log(sorted2); // Full sorted array

// Sort Slice:
console.log(sorted1.slice(0, 3).sort((a, b) => a - b)); // First 3 elements sorted
console.log(sorted1.slice(3).sort((a, b) => a - b));    // Remaining elements sorted

console.log(sorted2.slice(0, 4).sort((a, b) => a - b)); // First 4 elements sorted
console.log(sorted2.slice(4).sort((a, b) => a - b));    // Remaining elements sorted
