const alphabet = "abcdefghijklmnopqrstuvwxyz";
const friend = "BRUTUS"//The letters we are looking at
const shiftValue = 3; //Number of shifts
let encryptedName = "";

for(let i = 0; i < friend.length; i++){
    const currentLetter = friend[i];
    const currentIndex = alphabet.indexOf(currentLetter.toLowerCase());
    const newIndex = (currentIndex + shiftValue) % alphabet.length;
    encryptedName += alphabet[newIndex].toUpperCase();
}

//Question 1 
 ​/*
What advantage does using a loop provide over manually encrypting each letter?

Using a loop provides automation, enabling us to process each letter of the name consecutively
without redundant code. It ensures consistent encryption and can easily adapt to names of any length.


Question 2 ​
Explain the role of % alphabet.length in our loop. How does it aid in the encryption process?

The modulus operator, %, ensures that if the sum of the current index and the shift value surpasses
the alphabet's length, it wraps around to the start. Thus, after "z", we return to "a", guaranteeing continuous encryption.



*/