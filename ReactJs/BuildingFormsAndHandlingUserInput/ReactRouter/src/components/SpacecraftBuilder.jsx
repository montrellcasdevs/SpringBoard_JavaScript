import { useState } from 'react';
import ItemForm from './ItemForm';
import InventoryDisplay from './InventoryDisplay';
import '../styles/SpacecraftBuilder.css';

function SpacecraftBuilder() {
  const [inventory, setInventory] = useState([]);

  // Handle adding a new item to inventory
  const handleAddItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: Date.now(), // Simple unique ID generation
    };
    setInventory([...inventory, itemWithId]);
  };

  // Handle deleting an item from inventory
  const handleDeleteItem = (itemId) => {
    setInventory(inventory.filter((item) => item.id !== itemId));
  };

  return (
    <div className="spacecraft-builder">
      <h1>🛸 Spacecraft Builder</h1>
      <p className="subtitle">Design your spacecraft by adding items to your inventory</p>
      
      <div className="builder-container">
        <div className="form-section">
          <ItemForm onAddItem={handleAddItem} />
        </div>
        
        <div className="display-section">
          <InventoryDisplay 
            inventory={inventory} 
            onDeleteItem={handleDeleteItem} 
          />
        </div>
      </div>
    </div>
  );
}

export default SpacecraftBuilder;
