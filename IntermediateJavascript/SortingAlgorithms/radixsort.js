class RadixSort {
    constructor(array) {
        this.array = array;
    }

    getMax(arr) {
        return Math.max(...arr);
    }

    countingSort(arr, exp) {
        let output = new Array(arr.length).fill(0);
        let count = new Array(10).fill(0);

        for (let i = 0; i < arr.length; i++) {
            let index = Math.floor(arr[i] / exp) % 10;
            count[index]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            let index = Math.floor(arr[i] / exp) % 10;
            output[count[index] - 1] = arr[i];
            count[index]--;
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
        }
    }

    sort() {
        let arr = this.array.slice(); // Copy to avoid mutating original
        let max = this.getMax(arr);
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            this.countingSort(arr, exp);
        }
        return arr;
    }
}

// Example usage:
const sorter1 = new RadixSort([8, 6, 1, 12]);
console.log(sorter1.sort()); 

const sorter2 = new RadixSort([10, 100, 1, 1000, 10000000]);
console.log(sorter2.sort()); 

const sorter3 = new RadixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]);
console.log(sorter3.sort()); 
