// inventory.mjs
//FUNCTIONS
let inventory = ['Monitor', 'Keyboard', 'Mouse'];

//Create and update
export function addItem(item) {
  inventory.push(item);
}
//Delete
export function removeItem(item) {
  const index = inventory.indexOf(item);
  if (index !== -1) {
    inventory.splice(index, 1);
  }
}

//Read
export function listItems() {
  console.log('Current Inventory:', inventory.join(', '));
}
