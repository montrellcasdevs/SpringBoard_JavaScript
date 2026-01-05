import React from 'react'

export default function Controls({
  drawCard,
  shuffleDeck,
  toggleAutoDraw,
  isAutoDrawing,
  shuffling,
  loading,
  remaining,
  drawButtonRef,
}) {
  return (
    <div style={{marginBottom:12, display:'flex', alignItems:'center', gap:12}}>
      <button
        ref={drawButtonRef}
        onClick={drawCard}
        disabled={loading || remaining === 0}
      >
        {loading ? 'Loading deck...' : remaining === 0 ? 'No cards' : 'Draw Card'}
      </button>

      <button onClick={shuffleDeck} disabled={shuffling || loading}>
        {shuffling ? 'Shuffling...' : 'Shuffle Deck'}
      </button>

      <button onClick={toggleAutoDraw} disabled={loading || shuffling || remaining === 0}>
        {isAutoDrawing ? 'Stop Auto-Draw' : 'Start Auto-Draw'}
      </button>

      <span style={{marginLeft:12}}>{remaining != null ? `Remaining: ${remaining}` : ''}</span>
    </div>
  )
}
