import React, { useState, useMemo } from 'react';
import MissionCard from './MissionCard';
import MissionAction from './MissionAction';
import MissionFilter from './MissionFilter';

function MissionControl({ missions: initialMissions = [] }) {
  const [missions, setMissions] = useState(initialMissions);
  const [filter, setFilter] = useState('All');

  const updateMissionStatus = (id, newStatus) => {
    setMissions(prev => prev.map(m => (m.id === id ? { ...m, status: newStatus } : m)));
  };

  const filteredMissions = useMemo(() => {
    if (filter === 'All') return missions;
    return missions.filter(m => m.status === filter);
  }, [missions, filter]);

  return (
    <div className="mission-control">
      <h1>Mission Control</h1>
      <MissionFilter currentFilter={filter} onFilterChange={setFilter} />

      <div className="missions-list">
        {filteredMissions.map(m => (
          <div key={m.id} className="mission-item">
            <MissionCard mission={m} />
            <MissionAction mission={m} onUpdateStatus={newStatus => updateMissionStatus(m.id, newStatus)} />
          </div>
        ))}

        {filteredMissions.length === 0 && <p>No missions match the selected filter.</p>}
      </div>
    </div>
  );
}

export default MissionControl;
