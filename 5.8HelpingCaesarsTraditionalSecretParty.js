const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Encrypts a message using Caesar's cipher and inserts a random letter after every two letters.
// Non-alphabetic characters are passed through unchanged.
function encrypt(message, shiftValue) {
  // Ensure shiftValue is within the range of 0-25
  let encryptedMessage = "";
  // Normalize shiftValue to be within 0-25
  let letterCount = 0;

  for (let i = 0; i < message.length; i++) {
    // Get the current character
    let ch = message.charAt(i);
    // Convert to lowercase for index lookup
    let lowerCh = ch.toLowerCase();
    // Check if the character is an alphabetic letter
    if (alphabet.indexOf(lowerCh) !== -1) {
      // Shift the character
      let isUpper = (ch === ch.toUpperCase());
      // Convert to lowercase for index lookup
      let idx = alphabet.indexOf(lowerCh);
      // Calculate the new index with wrapping
      let shiftedIdx = (idx + shiftValue) % 26;
      // Ensure the index is non-negative
      let shiftedChar = alphabet.charAt(shiftedIdx);
      // Convert back to uppercase if the original character was uppercase
      if (isUpper) shiftedChar = shiftedChar.toUpperCase();
      // Append the shifted character to the encrypted message
      encryptedMessage += shiftedChar;
      // Increment letter count
      letterCount++;
      // After every two letters, insert a random letter
      if (letterCount % 2 === 0) {
        // Generate a random letter from the alphabet
        let randIdx = Math.floor(Math.random() * 26);
        // Ensure the random letter is lowercase
        let randChar = alphabet.charAt(randIdx);
        // If the original character was uppercase, convert the random letter to uppercase
        if (isUpper) randChar = randChar.toUpperCase();
        // Append the random letter to the encrypted message
        encryptedMessage += randChar;
      }
    } else {
      // Non-alphabetic character, pass as is
      encryptedMessage += ch;
    }
  }
  // Return the encrypted message
  return encryptedMessage;
}

// Decrypts a message encrypted with the above Caesar's cipher variant.
// Removes every third letter (the random one inserted during encryption).
// Non-alphabetic characters are passed through unchanged.
function decrypt(encryptedMessage, shiftValue) {
  // Ensure shiftValue is within the range of 0-25
  let decryptedMessage = "";
  // Normalize shiftValue to be within 0-25
  let letterCount = 0;
  // Initialize letter count to track real letters
  let i = 0;

  while (i < encryptedMessage.length) {
    // Get the current character
    let ch = encryptedMessage.charAt(i);
    // Convert to lowercase for index lookup
    let lowerCh = ch.toLowerCase();
    // Check if the character is an alphabetic letter
    if (alphabet.indexOf(lowerCh) !== -1) {
      // Increment letter count
      letterCount++;
      // Only decrypt real letters (skip every third letter)
      if (letterCount % 3 !== 0) {
        // Shift the character back
        let isUpper = (ch === ch.toUpperCase());
        // Convert to lowercase for index lookup
        let idx = alphabet.indexOf(lowerCh);
        // Calculate the new index with wrapping
        let shiftedIdx = (idx - shiftValue) % 26;
        // Ensure the index is non-negative
        if (shiftedIdx < 0) shiftedIdx += 26;
        // Get the shifted character
        let shiftedChar = alphabet.charAt(shiftedIdx);
        // Convert back to uppercase if the original character was uppercase
        if (isUpper) shiftedChar = shiftedChar.toUpperCase();
        // Append the shifted character to the decrypted message
        decryptedMessage += shiftedChar;
      }
      // Move to the next character
      i++;
    } else {
      // Non-alphabetic character, pass as is
      decryptedMessage += ch;
      // Increment i to move to the next character
      i++;
      
    }
  }
  // Return the decrypted message
  return decryptedMessage;
}