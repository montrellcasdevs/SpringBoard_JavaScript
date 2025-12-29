
// --- Main App Component ---
const App = () => {
    return React.createElement(
        'div',
        { className: 'app-container' },
        React.createElement('h1', null, 'React Battle Game'),
        React.createElement(Game, {}) // Render the Game component
    );
};
