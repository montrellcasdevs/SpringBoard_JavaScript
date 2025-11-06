import React from 'react';

function MissionFilter({ currentFilter = 'All', onFilterChange }) {
  const options = ['All', 'Planned', 'Active', 'Completed'];

  return (
    <div className="mission-filter" style={{marginBottom: '12px'}}>
      {options.map(opt => (
        <button key={opt} onClick={() => onFilterChange(opt)} disabled={currentFilter === opt} style={{marginRight: '6px'}}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export default MissionFilter;
