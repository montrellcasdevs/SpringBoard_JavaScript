//Track Animal Sightings
const serengeti = [
    { species: "Lion", habitat: "Serengeti", population: 5, status: "Endangered" },
    { species: "Elephant", habitat: "Serengeti", population: 12, status: "Vulnerable" }
];
const masaiMara = [
    { species: "Lion", habitat: "Masai Mara", population: 80, status: "Least Concern" },
    { species: "Elephant", habitat: "Masai Mara", population: 117, status: "Vulnerable" }
];
//Merge the two arrays
const animalSightings = [...serengeti, ...masaiMara];
//Function to log sightings
function logSightings(animalSightings) {
    animalSightings.forEach(sighting => {
        console.log(`Species: ${sighting.species}, Location: ${sighting.location}, Count: ${sighting.count}`);
    });
}

//Log all animal sightings
logSightings(animalSightings);

//Update Conservation Status
const conservationStatus = [{
  species: "Panda",
  habitat: "Forest",
  population: 1864,
  status: "Vulnerable"
},
...serengeti,
...masaiMara
];

const updatedStatus = {
  ...conservationStatus,
  population: 2000, // new population
  habitat: "Mountain Forest" // new habitat
};

console.log(updatedStatus);

//4. Catalog Genetic Diversity
const animalProfile = {
  species: "Tiger",
  population: 3900,
  traits: {
    color: "orange",
    stripes: true
  }
};

// Shallow copy and add genetics property
const animalProfileWithGenetics = {
  ...animalProfile,
  genetics: {
    diversityIndex: 0.85
  }
};

// Change a nested property in the copy
animalProfileWithGenetics.traits.color = "white";

console.log(animalProfile.traits.color); // "white" (changed in original too)
console.log(animalProfileWithGenetics.traits.color); // "white"

//5. Example: Analyze Ecosystem Health with shallow copy
const ecosystemHealth = {
  waterQuality: {
    pH: 7.2,
    contaminants: ["lead", "mercury"]
  },
  foodSupply: {
    plants: 1200,
    animals: 300
  }
};

// Shallow copy using spread operator
const copiedEcosystemHealth = {
  ...ecosystemHealth
};

// Modify a nested property in the copy
copiedEcosystemHealth.waterQuality.pH = 6.8;

console.log("Original pH:", ecosystemHealth.waterQuality.pH); // 6.8
console.log("Copied pH:", copiedEcosystemHealth.waterQuality.pH); // 6.8

// Explanation:
// Because the copy is shallow, both objects share the same nested 'waterQuality' object.
// Changing 'pH' in the copy also changes it in the original.