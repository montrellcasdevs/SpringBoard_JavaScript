const friend = "BRUTUS";
const shiftValue = 3;
const alphabet = "abcdefghijklmnopqrstuvwxyz";

//Step 1
function encryptLetter(letter, shift){
    //find the index of the letter in the alphabet.
    const currentIndex = alphabet.indexOf(letter.toLowerCase());
    //Add the shift value to this index. ---//Use the modulus operator to ensure wrapping around the alphabet if necessary.
    const newIndex = (currentIndex + shift) % alphabet.length;
    //Return the encrypted letter.
    return alphabet[newIndex].toUpperCase();
}
//Step 2
//Use a loop to iterate over each letter in the word.
function encryptName(name, shift) {
    let encryptedName = "";
    //Use a loop to iterate over each letter in the word.
    for (let i = 0; i < name.length; i++) {
        const currentLetter = name[i];
        //Encrypt the current letter and add it to the encrypted name. Construct the encrypted message.
        encryptedName += encryptLetter(currentLetter, shift);
    }
    //Return the encrypted message
    return encryptedName;
}
//Step 3
function decryptLetter(letter, shift) {
    const currentIndex = alphabet.indexOf(letter.toLowerCase());
    const newIndex = (currentIndex - shift + alphabet.length) % alphabet.length;
    return alphabet[newIndex].toUpperCase();
}
//Step 4
function decryptName(name, shift) {
    let decryptedName = "";
    for (let i = 0; i < name.length; i++) {
        const currentLetter = name[i];
        decryptedName += decryptLetter(currentLetter, shift);
    }
    return decryptedName;
}