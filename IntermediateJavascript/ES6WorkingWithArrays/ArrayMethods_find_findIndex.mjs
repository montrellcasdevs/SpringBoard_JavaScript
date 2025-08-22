const creatureCatalog = [
	{ name: "Griffin", type: "Beast", lastSeenLocation: "Emerald Forest" },
	{ name: "Phoenix", type: "Bird", lastSeenLocation: "Ashen Peaks" },
	{ name: "Dragon", type: "Reptile", lastSeenLocation: "Crimson Mountains" },
	{ name: "Unicorn", type: "Mystic", lastSeenLocation: "Silver Meadows" },
	{ name: "Mermaid", type: "Water", lastSeenLocation: "Azure Lake" },
	{ name: "Kelpie", type: "Water", lastSeenLocation: "Enchanted Forest" }
];
//finds the first water creature
const waterCreature = creatureCatalog.find(creature => creature.type === "Water");
console.log(waterCreature);

// finds the index of the griffin
const griffinIndex = creatureCatalog.findIndex(creature => creature.name === "Griffin");
console.log(griffinIndex);

// find the creature last seen in Enchanted Forest
const enchantedForestCreature = creatureCatalog.find(creature => creature.lastSeenLocation === "Enchanted Forest");
console.log(enchantedForestCreature);
