const guests = ["ANTHONY", "CICERO","CASSIUS", "CLEOPATRA"];
//Step 1
guests.unshift("BRUTUS");
//console.log(guests);
//Step 2
guests.push("AUGUSTUS","LUCIA");
//console.log(guests);
//Step 3
//console.log(guests.indexOf("SPARTACUS"));
 spartacusIndex = guests.indexOf("SPARTACUS");
//Step 4
cassiusIndex = guests.indexOf("CASSIUS");
guests.splice(cassiusIndex,1);
//console.log(guests);
//Step 5
specialGuest = guests.shift(0, 3);
//console.log(specialGuest);
//Step 6
//guests.sort();
const honoredGuests = guests.slice(0, 1); // Extracts honored guests.
const otherGuests = guests.slice(1); // Extracts the rest of the guests.
otherGuests.sort(); // Sorts the other guests.
const sortedGuests = honoredGuests.concat(otherGuests); // Combines both arrays.
console.log(sortedGuests);
console.log(otherGuests);