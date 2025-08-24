// Imports the services via from the utils/index.mjs file 
//This is like the main method in java 
import { capitalize, reverse } from './utils/index.mjs';
import { NumberUtils } from './utils/index.mjs';
import { divide } from './utils/index.mjs'; //But it is best to just pull in the whole class

console.log(capitalize('hello world'));
console.log(reverse('springboard'));

//direct import from the exported devide function
console.log('Dividing 10 by 2 gives:', divide(10, 2));

//creating a new instance of NumberUtils class to test the add method
const test = new NumberUtils();
console.log(test.add(3, 7));
console.log(test.multiply(3, 7));

//testing the numberUtils.mjs functions
const number = 5;
// new instance of NumberUtils class
const numUtilInstance = new NumberUtils(number);
console.log(`Is ${number} even?`, numUtilInstance.isEven());
console.log(`Is ${number} odd?`, numUtilInstance.isOdd());
console.log(numUtilInstance.add(4,8));
console.log(numUtilInstance.subtract(10,6));
