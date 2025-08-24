//This is Export location two
// String manipulation utilities
//Using built-in JavaScript methods for string manipulation
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverse(str) {
  return str.split('').reverse().join('');
}
