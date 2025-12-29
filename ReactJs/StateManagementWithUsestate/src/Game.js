// --- Game Component (Container) ---
const Game = ({ playerMin = 5, playerMax = 12, enemyMin = 4, enemyMax = 15 }) => {
    const [playerHealth, setPlayerHealth] = React.useState(100);
    const [enemyHealth, setEnemyHealth] = React.useState(100);
    const [gameStatus, setGameStatus] = React.useState('active');

    const getRandomDamage = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const handleFire = () => {
        if (gameStatus !== 'active') return;
        const newPlayerHealth = Math.max(0, playerHealth - getRandomDamage(enemyMin, enemyMax));
        const newEnemyHealth = Math.max(0, enemyHealth - getRandomDamage(playerMin, playerMax));

        setPlayerHealth(newPlayerHealth);
        setEnemyHealth(newEnemyHealth);

        if (newPlayerHealth === 0 && newEnemyHealth === 0) setGameStatus('draw');
        else if (newEnemyHealth === 0) setGameStatus('win');
        else if (newPlayerHealth === 0) setGameStatus('loss');
    };

    const handleRestart = () => {
        setPlayerHealth(100);
        setEnemyHealth(100);
        setGameStatus('active');
    };

    return React.createElement(
        'div',
        { className: 'game-container' },
        React.createElement(HealthDisplay, { playerHealth, enemyHealth }),
        React.createElement(ActionButtons, { gameStatus, onFire: handleFire, onRestart: handleRestart }),
        React.createElement(EndGameMessage, { gameStatus })
    );
};
