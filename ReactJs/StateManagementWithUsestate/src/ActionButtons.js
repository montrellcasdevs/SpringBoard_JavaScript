// --- ActionButtons Component ---
const ActionButtons = ({ gameStatus, onFire, onRestart }) => {
    const isGameActive = gameStatus === 'active';
    return React.createElement(
        'div',
        { className: 'actions' },
        isGameActive
            ? React.createElement('button', { onClick: onFire, className: 'action-btn fire-btn' }, 'Fire')
            : React.createElement('button', { onClick: onRestart, className: 'action-btn restart-btn' }, 'Restart')
    );
};
