import './Loading.module.css';

export function Loading() {
  return (
    <div className="loading">
      <div className="loading__spinner"></div>
      <p className="loading__text">Loading...</p>
    </div>
  );
}
