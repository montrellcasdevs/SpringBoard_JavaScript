import React from 'react'
import Card from './Card'

export default function CardList({ cards }) {
  if (!cards || cards.length === 0) {
    return <p>No cards drawn yet. Click "Draw Card" to start.</p>
  }

  return (
    <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
      {cards.map((card, idx) => (
        <Card key={card.code + idx} card={card} />
      ))}
    </div>
  )
}
