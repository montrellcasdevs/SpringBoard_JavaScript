/* Task 1: Declare a Destination Variable */
let destination = "Ancient Egypt";
console.log(`Destination: ${destination}`);

/* Task 2: Change the Destination */
destination = "Medieval Europe";
console.log(`New Destination: ${destination}`);

/* Task 3: Declare a Constant Travel Date */
const travelDate = "2030-03-15";
console.log(`Travel Date: ${travelDate}`);
/*
 * Observations:
 * The above attempt to reassign a new value to "travelDate" will result in a TypeError.
 * This is because "const" declarations are read-only and cannot be reassigned after their initial assignment.
 */

/* Task 4: Experiment with Variable Hoisting */
console.log(`Time Machine Model: ${timeMachineModel}`);
var timeMachineModel = "T-800";
/*
 * Observations:
 * The console.log statement prints "undefined" instead of throwing a ReferenceError.
 * This is due to variable hoisting, where variable declarations (but not initializations) are hoisted or lifted to the top of their scope.
 * In this case, "timeMachineModel" is declared with "var", so its declaration is hoisted to the top of its scope.
 * However, its assignment occurs after the console.log statement, explaining why it logs "undefined".
 */
