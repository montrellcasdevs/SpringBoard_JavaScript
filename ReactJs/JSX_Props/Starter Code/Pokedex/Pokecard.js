function Pokecard({ id, name, type, base_experience }) {
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="Pokecard" style={{ border: '1px solid #ccc', padding: '8px', margin: '8px', display: 'inline-block', textAlign: 'center' }}>
      <h3>{name}</h3>
      <img src={img} alt={name} />
      <div>Type: {type}</div>
      <div>EXP: {base_experience}</div>
    </div>
  );
}

// expose to global scope for the browser (Babel + UMD) setup
window.Pokecard = Pokecard;
