//1. Unveiling the Coordinates
const coordinates = { x: 10, y: 20};

// Destructuring assignment
const { x, y } = coordinates;

console.log(x); // 10
console.log(y); // 20
//2. The Map of Secrets
const locations = {
  forest: "Enchanted Woods",
  cave: "Crystal Cavern",
  lake: "Mirror Lake",
  mountain: "Storm Peak"
};

const { forest, cave, ...remaining } = locations;

console.log("Key locations:", forest, cave);
console.log("Remaining locations:", remaining);

//3. The Mysterious Door
// Example doorCode object (could be incomplete)
const doorCode = {
  first: 7,
  // middle is missing
  last: 3
};

// Use object destructuring with defaults
const { 
  first = 0, 
  middle = remaining.lake, // default to a value from 'remaining' if not provided
  last = 0 
} = doorCode;

console.log("Door code sequence:", first, middle, last);
//4. The Guardian's Riddle
const riddle = {
  ancientWord: "gooopicolo"
};

let ancientWord = translation
// Destructuring the riddle object
const { ancientWord: translation } = riddle;

console.log("Translation:", translation);

//5. The Array of Elements
const elements = ["Coin", "Newspaper", "Map", "Shoes"];

// Destructuring the elements array
const [firstElement, secondElement, ...remainingElements] = elements;

console.log("First Element:", firstElement);
console.log("Second Element:", secondElement);

//6. Skipping Stones
const [firstStone, , thirdStone, , fifthStone, sixthStone] = ["Pebble", "Rock", "Boulder","Marble","Blackrock","Stone"];
console.log("First Stone:", firstStone);
console.log("Sixth Stone:", sixthStone);

//7. The Array of Shadows
const shadows = ["Shadow1", "Shadow2", "Shadow3", "Shadow4"];
const [firstShadow, secondShadow, ...remainingShadows] = shadows;
const hiddenShadows = remainingShadows;

console.log("First Shadow:", firstShadow);
console.log("Hidden Shadows:", hiddenShadows);

//8. The Wise Function
function revealPath({ direction, distance }) {
  console.log(`Travel ${distance} units towards ${direction}.`);
}

// Example usage:
revealPath({ direction: "north", distance: 50 });


//9. Potion of Clarity
function mixPotion({ ingredient1 = "Water", ingredient2 = "Fireflower", ingredient3 }) {
  console.log(`Brewing potion with ${ingredient1}, ${ingredient2}, and ${ingredient3}.`);
}

// Example
mixPotion({ ingredient3: "Phoenix Feather" }); // Uses defaults for ingredient1 and ingredient2
mixPotion({ ingredient1: "Moondew", ingredient3: "Phoenix Feather" }); // Uses default for ingredient2
mixPotion({ ingredient1: "Water", ingredient2: "Fireflower", ingredient3: "Phoenix Feather" }); // All provided

//10. The Array Spell
function castSpell([ingredient1, ingredient2]) {
  console.log("Casting spell with:", ingredient1, ingredient2);
}

// Example usage:
castSpell(["Essence of Moonlight", "Dragon Scale", "Phoenix Ash"]);

//11. The Nested Secret
const artifact = {
  chamber: {
    pedestal: {
      theFinalKey: "Ultimate Clue"
    }
  }
};

const { chamber: { pedestal: { theFinalKey } } } = artifact;

console.log("Unveiled secret:", theFinalKey);

//12 The Swap of Fate
let stoneA = "Ruby";
let stoneB = "Sapphire";

// Swap using array destructuring
[stoneA, stoneB] = [stoneB, stoneA];

console.log("After swap:", stoneA, stoneB);