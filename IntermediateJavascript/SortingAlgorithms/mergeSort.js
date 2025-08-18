class MergeSort {
    constructor(array) {
        this.array = array;
    }

    sort(arr = this.array) {
        if (arr.length <= 1) { // Base case. Check if it is positive
            return arr;
        }
        const mid = Math.floor(arr.length / 2); //divide and conquer
        const left = this.sort(arr.slice(0, mid));
        const right = this.sort(arr.slice(mid));
        return this.merge(left, right);
    }

    merge(left, right) {
        let result = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }
        return result.concat(left.slice(i)).concat(right.slice(j));
    }
}

// Console result
const sorter1 = new MergeSort([4, 20, 12, 10, 7, 9]);
console.log(sorter1.sort());

const sorter2 = new MergeSort([0, -10, 7, 4]);
console.log(sorter2.sort());

const sorter3 = new MergeSort([1, 2, 3]);
console.log(sorter3.sort());

let nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2,
    453, 546, 75, 67, 4342, 32
];
const sorter4 = new MergeSort(nums);
console.log(sorter4.sort());



