import '../styles/ItemCard.css';

function ItemCard({ item }) {
  return (
    <div className="item-card">
      <div className="card-header">
        <h3 className="item-name">{item.name}</h3>
        <span className="item-quantity">Qty: {item.quantity}</span>
      </div>
      
      <div className="card-body">
        <div className="purpose-section">
          <p className="purpose-label">Purpose:</p>
          <p className="purpose-text">{item.purpose}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
