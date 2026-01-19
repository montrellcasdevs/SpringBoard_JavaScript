import { useState } from 'react';
import '../styles/ItemForm.css';

function ItemForm({ onAddItem }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    purpose: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: '',
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add item to inventory
    onAddItem({
      name: formData.name.trim(),
      quantity: parseInt(formData.quantity, 10),
      purpose: formData.purpose.trim(),
    });

    // Clear form
    setFormData({
      name: '',
      quantity: '',
      purpose: '',
    });
    setErrors({});
  };

  return (
    <div className="item-form">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Item Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? 'input-error' : ''}
            placeholder="e.g., Solar Panel"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity *</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className={errors.quantity ? 'input-error' : ''}
            placeholder="e.g., 5"
            min="1"
          />
          {errors.quantity && <span className="error-message">{errors.quantity}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Purpose *</label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            className={errors.purpose ? 'input-error' : ''}
            placeholder="e.g., Generate power for the spacecraft"
            rows="3"
          />
          {errors.purpose && <span className="error-message">{errors.purpose}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Add Item to Inventory
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
