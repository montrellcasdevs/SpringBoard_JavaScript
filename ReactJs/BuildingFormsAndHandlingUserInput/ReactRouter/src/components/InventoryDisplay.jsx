import ItemCard from './ItemCard';
import ItemAction from './ItemAction';
import '../styles/InventoryDisplay.css';

function InventoryDisplay({ inventory, onDeleteItem }) {
  return (
    <div className="inventory-display">
      <h2>Inventory ({inventory.length} items)</h2>
      
      {inventory.length === 0 ? (
        <div className="empty-inventory">
          <p>No items in inventory yet. Add your first item to get started!</p>
        </div>
      ) : (
        <div className="items-container">
          {inventory.map((item) => (
            <div key={item.id} className="item-wrapper">
              <ItemCard item={item} />
              <ItemAction itemId={item.id} onDelete={onDeleteItem} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InventoryDisplay;
