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
const sorter1 = new QuickSort([5, 2, 9, 1, 5, 6]);
console.log(sorter1.sort()); 

const sorter2 = new QuickSort([5, 2, 9, 1, 5, 6]);
console.log(sorter2.sort()); 

const sorter3 = new QuickSort([5, 2, 9, 1, 5, 6]);
console.log(sorter3.sort()); 

let nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23,
    2, 453, 546, 75, 67, 4342, 32
];

const sorter4 = new QuickSort(nums);
console.log(sorter4.sort()); 
