// Print numbers from 1 to 100
for (let i = 1; i <= 100; i++) {
   
    if (i % 15 === 0) {
        console.log("FizzBuzz");
        //If the number is divisible by 3, print `"Fizz"` instead of the number.
    } else if (i % 3 === 0) {
        console.log("Fizz");
        ////If the number is divisible by 5, print `"Buzz"` instead of the number.
    } else if (i % 5 === 0) {
        console.log("Buzz");
        //If the number is divisible by both 3 and 5, print `"FizzBuzz"` instead of the number.
        //Otherwise, print the number itself.
    } else {
        console.log(i);
    }
}

/**
 *
 * FizzBuzz is a common programming exercise that tests basic logic and understanding of loops and conditionals.

**How FizzBuzz works:**
- Print numbers from 1 to 100.
- For each number:
  - If the number is divisible by 3, print `"Fizz"` instead of the number.
  - If the number is divisible by 5, print `"Buzz"` instead of the number.
  - If the number is divisible by both 3 and 5, print `"FizzBuzz"` instead of the number.
  - Otherwise, print the number itself.

**Purpose:**  
FizzBuzz helps practice using loops, the modulus operator (`%`), and conditional statements in programming.
 *
 */