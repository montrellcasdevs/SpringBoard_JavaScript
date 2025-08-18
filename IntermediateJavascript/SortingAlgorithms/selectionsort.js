class SelectionSort {
    constructor(array) {
        this.array = array;
    }

    sort() {
        let arr = this.array.slice(); // Copy to avoid mutating original
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            }
        }
        return arr;
    }
}

// Example usage:
const sorter1 = new SelectionSort([4, 20, 12, 10, 7, 9]);
console.log(sorter1.sort()); 

const sorter2 = new SelectionSort([0, -10, 7, 4]);
console.log(sorter2.sort()); 

const sorter3 = new SelectionSort([1, 2, 3]);
console.log(sorter3.sort()); 

let nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2,
    453, 546, 75, 67, 4342, 32
];

const sorter = new SelectionSort(nums);
console.log(sorter.sort()); 
