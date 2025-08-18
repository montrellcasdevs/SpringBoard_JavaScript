class Merger {
    constructor(arr1, arr2) {
        this.arr1 = arr1;
        this.arr2 = arr2;
    }

    merge() {
        let result = [];
        let i = 0, j = 0;
        while (i < this.arr1.length && j < this.arr2.length) {
            if (this.arr1[i] < this.arr2[j]) {
                result.push(this.arr1[i]);
                i++;
            } else {
                result.push(this.arr2[j]);
                j++;
            }
        }
        // Add remaining elements
        while (i < this.arr1.length) {
            result.push(this.arr1[i]);
            i++;
        }
        while (j < this.arr2.length) {
            result.push(this.arr2[j]);
            j++;
        }
        return result;
    }
}

// Example usage:
const merger0 = new Merger([1,3,4,5], [2,4,6,8]);
console.log("Result from arr1 and arr2 "+merger0.merge());

const merger1 = new Merger([-2,-1,0,4,5,6], [-3,-2,-1,2,3,5,7,8]);
console.log("Result from arr3 and arr4 "+merger1.merge());

const merger2 = new Merger([3,4,5], [1,2]);
console.log("Result from arr5 and arr6 "+merger2.merge());