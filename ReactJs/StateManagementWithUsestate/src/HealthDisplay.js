// --- HealthDisplay Component ---
const HealthDisplay = ({ playerHealth, enemyHealth }) => {
    return React.createElement(
        'div',
        { className: 'health-display' },
        React.createElement('h2', { className: 'player-health' }, 'Player Health: ', playerHealth),
        React.createElement('h2', { className: 'enemy-health' }, 'Enemy Health: ', enemyHealth)
    );
};

