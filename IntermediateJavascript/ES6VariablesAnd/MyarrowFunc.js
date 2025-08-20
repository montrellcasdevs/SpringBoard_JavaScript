
//2. If use the no curly brackets, it must be first
const scanForLife = () => "No lifeforms detected";
console.log(scanForLife());

// 1. no parameters, implicit return, Objects, and this in arrow functions
const activeHyperdrive = () => {"Hyperdrive activated"};
console.log(activeHyperdrive());

//3. Log Coordinates
const correctCoordinates = () => ({x: 100, y: 150, z:300});
console.log(correctCoordinates());

//4. this- Message from Home Base. It automatically refer to the value of the parameter
const spacecraft = (x) => {return {receiveMessage: () => {console.log(x)}} }
spacecraft("Hello World!!!").receiveMessage();







//Ok I see  

/* Task 4: Understanding `this`: Message from Home Base */
const spacecrafts = {
	name: "Galactic Voyager",
	receiveMessage: (message) =>
	{
		console.log(`Message received: ${message}`);
		console.log(`This spacecraft is: ${this.name}`);
	}
};
spacecraft.receiveMessage("Hello from Earth!");
/*
 * Observations:
 * The console.log statement prints "undefined" for `this.name` because arrow functions do not have their own `this` context.
 * Instead, they inherit `this` from the parent scope at the time they are defined.
 * In this case, `this` does not refer to the `spacecraft` object.
 */
