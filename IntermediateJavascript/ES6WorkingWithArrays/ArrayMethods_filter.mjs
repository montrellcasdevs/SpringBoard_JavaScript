const planets = [
	{ name: "Mercury", temperature: 440, distanceFromSun: 0.39 },
	{ name: "Venus", temperature: 737, distanceFromSun: 0.72 },
	{ name: "Earth", temperature: 288, distanceFromSun: 1.00 },
	{ name: "Mars", temperature: 210, distanceFromSun: 1.52 },
	{ name: "Jupiter", temperature: 165, distanceFromSun: 5.20 },
	{ name: "Saturn", temperature: 134, distanceFromSun: 9.58 },
	{ name: "Uranus", temperature: 76, distanceFromSun: 19.18 },
	{ name: "Neptune", temperature: 72, distanceFromSun: 30.07 }
];
/*
let filteredPlanets = planets.filter(planet => planet.temperature >= 253 && planet.temperature <= 323);
let filteredPlanetsByDistance = planets.filter(planet => planet.distanceFromSun >= 0.75 && planet.distanceFromSun <= 1.5);
//finds the planets that matches the criteria
let matchedPlanets = filteredPlanetsByDistance.filter(planet => filteredPlanets.includes(planet));
console.log(matchedPlanets);
*/
//Simplified -don't repeat yourself, method chaining
const habitablePlanets = planets
	.filter(planet =>
		planet.temperature >= 253 && planet.temperature <= 323 &&
		planet.distanceFromSun >= 0.75 && planet.distanceFromSun <= 1.5
	)
	.map(planet => planet.name); // Extracting just the names of the habitable planets

console.log(habitablePlanets);