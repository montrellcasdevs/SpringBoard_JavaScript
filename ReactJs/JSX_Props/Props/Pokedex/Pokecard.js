function Pokecard({ id, name, type, base_experience }) {
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="Pokecard" style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      padding: '1rem', 
      margin: '1rem', 
      display: 'inline-block', 
      textAlign: 'center',
      backgroundColor: '#f3f3f3',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>{name}</h3>
      <img src={img} alt={name} style={{ width: '120px', height: '120px' }} />
      <div style={{ marginTop: '0.5rem', color: '#666' }}>Type: {type}</div>
      <div style={{ color: '#666' }}>EXP: {base_experience}</div>
    </div>
  );
}

// expose for browser usage
window.Pokecard = Pokecard;