function App() {
  return (
    <div className="App">
      <window.Pokedex />
    </div>
  );
}

// render directly so loading this script in the browser shows the Pokedex
ReactDOM.render(<App />, document.getElementById('root'));
