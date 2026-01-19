import { useNavigate } from 'react-router-dom';
import '../styles/NavigateBackButton.css';

export default function NavigateBackButton() {
  const navigate = useNavigate();

  return (
    <button 
      className="back-button" 
      onClick={() => navigate(-1)}
      aria-label="Go back to previous page"
    >
      ← Back
    </button>
  );
}
