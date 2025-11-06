import React from 'react';

function MissionCard({ mission }) {
  const { name, status, crew = [] } = mission;

  return (
    <div className="mission-card">
      <h2 style={{margin: '0 0 6px 0'}}>{name}</h2>
      <p style={{margin: '4px 0'}}><strong>Status:</strong> {status}</p>
      <p style={{margin: '4px 0'}}><strong>Crew:</strong> {crew.join(', ')}</p>
    </div>
  );
}

export default MissionCard;
