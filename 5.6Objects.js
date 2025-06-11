const guests = {
  ANTONY: {
    title: "General",
    region: "Rome",
    dietaryPreference: "Vegetarian",
    pastGifts: ["Golden Laurel", "Chariot"]
  },
  CICERO: {
    title: "Orator",
    region: "Arpinum",
    dietaryPreference: "Omnivore",
    pastGifts: ["Scroll of Proverbs", "Quill","Golden Lyre"]
  },
  BRUTUS: {
    title: "Senator",
    region: "Rome",
    dietaryPreference: "Vegan",
    pastGifts: ["Silver Dagger", "Marbel Bust"]
  }
};

//Step 1
//above
//Step 2
//above
//Step 3
//const antonyRegion = guests.ANTONY.region;
//Step 4
//delete(guests.ANTONY);
//console.log(guests);
//Step 5
let generalProfile = guests.ANTONY;
generalProfile.region = "Egypt";
console.log(generalProfile);
console.log(guests);