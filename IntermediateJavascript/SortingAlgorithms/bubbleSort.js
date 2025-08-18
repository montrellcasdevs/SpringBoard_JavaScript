function ArrayList(){
    var array = [];
    this.insert = function(item){ //function does inserting
        array.push(item)
    };

    this.toString = function() { //function does printing
        return array.join();
    };

    this.bubbleSort = function(){  //function does the sorting
        var length = array.length;
        for (var i = 0; i < length - 1; i++) {
            for (var j = 0; j < length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // Swap
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            }
        }
    };
}

// Adding to the list:
var list = new ArrayList(); //new array
list.insert(5);
list.insert(2);
list.insert(9);
list.insert(1);
list.insert(5);
list.insert(6);
list.bubbleSort(); //calling the bubble sort on the new array
console.log(list.toString()); // Output: 1, 2, 5, 5, 6, 9