import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SpaceTravelApi } from '../services/SpaceTravelApi';
import './ConstructionPage.module.css';

export function ConstructionPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    description: '',
    pictureUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Spacecraft name is required';
    }

    if (!formData.capacity || isNaN(formData.capacity) || parseInt(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacity must be a positive number';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const response = await SpaceTravelApi.createSpacecraft({
      name: formData.name.trim(),
      capacity: parseInt(formData.capacity),
      description: formData.description.trim(),
      pictureUrl: formData.pictureUrl.trim() || undefined
    });

    if (response.isError) {
      setErrors({ submit: 'Failed to build spacecraft. Please try again.' });
      setLoading(false);
    } else {
      navigate('/spacecrafts');
    }
  };

  return (
    <div className="construction-page">
      <div className="construction-page__container">
        <header className="construction-page__header">
          <h1 className="construction-page__title">Spacecraft Construction</h1>
          <p className="construction-page__subtitle">
            Design and build a new spacecraft for your fleet
          </p>
        </header>

        <Link to="/spacecrafts" className="construction-page__back">
          ← Back to Fleet
        </Link>

        <form className="construction-page__form" onSubmit={handleSubmit}>
          <div className="construction-page__form-group">
            <label htmlFor="name" className="construction-page__label">
              <strong>Spacecraft Name *</strong>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Titan Explorer"
                className={`construction-page__input ${errors.name ? 'construction-page__input--error' : ''}`}
              />
              {errors.name && <span className="construction-page__error-message">{errors.name}</span>}
            </label>
          </div>

          <div className="construction-page__form-group">
            <label htmlFor="capacity" className="construction-page__label">
              <strong>Passenger Capacity *</strong>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g., 1000"
                min="1"
                className={`construction-page__input ${errors.capacity ? 'construction-page__input--error' : ''}`}
              />
              {errors.capacity && <span className="construction-page__error-message">{errors.capacity}</span>}
            </label>
          </div>

          <div className="construction-page__form-group">
            <label htmlFor="description" className="construction-page__label">
              <strong>Description *</strong>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the purpose and specifications of this spacecraft..."
                rows="5"
                className={`construction-page__textarea ${errors.description ? 'construction-page__textarea--error' : ''}`}
              />
              {errors.description && <span className="construction-page__error-message">{errors.description}</span>}
            </label>
          </div>

          <div className="construction-page__form-group">
            <label htmlFor="pictureUrl" className="construction-page__label">
              <strong>Picture URL (Optional)</strong>
              <input
                type="url"
                id="pictureUrl"
                name="pictureUrl"
                value={formData.pictureUrl}
                onChange={handleChange}
                placeholder="https://example.com/spacecraft.jpg"
                className="construction-page__input"
              />
              <small className="construction-page__help-text">
                Leave empty to use a default placeholder image
              </small>
            </label>
          </div>

          {errors.submit && (
            <div className="construction-page__alert construction-page__alert--error">
              {errors.submit}
            </div>
          )}

          <div className="construction-page__actions">
            <button
              type="submit"
              disabled={loading}
              className="construction-page__btn construction-page__btn--primary"
            >
              {loading ? 'Building...' : 'Build Spacecraft'}
            </button>
            <Link to="/spacecrafts" className="construction-page__btn construction-page__btn--secondary">
              Cancel
            </Link>
          </div>

          <div className="construction-page__info-box">
            <h3 className="construction-page__info-title">Important Notes</h3>
            <ul className="construction-page__info-list">
              <li>All new spacecraft will start on Earth</li>
              <li>Name, Capacity, and Description are required fields</li>
              <li>Capacity determines how many people can be transported per mission</li>
              <li>You can dispatch your spacecraft to other planets once built</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
