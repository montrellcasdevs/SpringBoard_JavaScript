function App() {
  return (
    <div className="App">
      <window.Pokedex />
    </div>
  );
}

// Render the app directly (this is loaded last in index.html)
ReactDOM.render(<App />, document.getElementById('root'));