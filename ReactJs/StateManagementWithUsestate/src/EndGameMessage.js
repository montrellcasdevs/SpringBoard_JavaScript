// --- EndGameMessage Component ---
const EndGameMessage = ({ gameStatus }) => {
    if (gameStatus === 'active') return null;

    const messages = {
        win: 'Congratulations, you won!',
        loss: 'You lost. Better luck next time!',
        draw: 'It\'s a draw! An honorable stalemate.'
    };
    
    const messageClasses = {
        win: 'win-message',
        loss: 'loss-message',
        draw: 'draw-message'
    };

    return React.createElement('h3', { className: `end-game-message ${messageClasses[gameStatus]}` }, messages[gameStatus]);
};