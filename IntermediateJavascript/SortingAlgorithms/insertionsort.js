class InsertionSort {
    constructor(array) {
        this.array = array;
    }

    sort() {
        let arr = this.array.slice(); // Copy to avoid mutating original
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
        return arr;
    }
}

// Example usage:
const sorter1 = new InsertionSort([4, 20, 12, 10, 7, 9]);
console.log(sorter1.sort());

const sorter2 = new InsertionSort([0, -10, 7, 4]);
console.log(sorter2.sort());

const sorter3 = new InsertionSort([1, 2, 3]);
console.log(sorter3.sort());

let nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2,
    453, 546, 75, 67, 4342, 32
];

const sorter4 = new InsertionSort(nums);
console.log(sorter4.sort());