import '../styles/ItemAction.css';

function ItemAction({ itemId, onDelete }) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      onDelete(itemId);
    }
  };

  return (
    <div className="item-action">
      <button onClick={handleDelete} className="delete-btn">
        🗑️ Delete
      </button>
    </div>
  );
}

export default ItemAction;
