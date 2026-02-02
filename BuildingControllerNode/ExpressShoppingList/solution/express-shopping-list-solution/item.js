/** Item in a shopping cart. */
const items = require("./fakeDb")

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    // keep track of all items
    items.push(this);
  }

  static findAll(){
    return items
  }
  /** Update found item with matching name to data. */

  static update(name, data) {
    let foundItem = Item.find(name);
    if (foundItem === undefined) {
      throw {message: "Not Found", status: 404}
    }
    // only update fields that are provided
    if (data.name !== undefined) foundItem.name = data.name;
    if (data.price !== undefined) foundItem.price = data.price;

    // return only the fields that were provided in the request
    const updated = {};
    if (data.name !== undefined) updated.name = foundItem.name;
    if (data.price !== undefined) updated.price = foundItem.price;

    return updated;
  }

  /** Find & return item with matching name. */

  static find(name) {
    const foundItem = items.find(v => v.name === name);
    if(foundItem === undefined){
      throw { message: "Not Found", status: 404 }
    }
    return foundItem
  }

  /** Remove item with matching id. */


  static remove(name) {
    let foundIdx = items.findIndex(v => v.name === name);
    if (foundIdx === -1) {
      throw {message: "Not Found", status: 404}
    }
    items.splice(foundIdx, 1);
  }
}

module.exports = Item;
