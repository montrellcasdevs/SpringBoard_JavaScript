import React from 'react';

function MissionAction({ mission, onUpdateStatus }) {
  const { status } = mission;

  return (
    <div className="mission-actions" style={{marginTop: '8px'}}>
      <button onClick={() => onUpdateStatus('Planned')} disabled={status === 'Planned'} style={{marginRight: '6px'}}>
        Set Planned
      </button>
      <button onClick={() => onUpdateStatus('Active')} disabled={status === 'Active'} style={{marginRight: '6px'}}>
        Launch Mission
      </button>
      <button onClick={() => onUpdateStatus('Completed')} disabled={status === 'Completed'}>
        Complete Mission
      </button>
    </div>
  );
}

export default MissionAction;
