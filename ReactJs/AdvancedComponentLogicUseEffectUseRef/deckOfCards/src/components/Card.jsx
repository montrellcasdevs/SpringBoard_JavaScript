import React from 'react'

export default function Card({ card }) {
  return (
    <div style={{textAlign:'center'}}>
      <img src={card.image} alt={`${card.value} of ${card.suit}`} style={{height:140}} />
      <div>{card.code} — {card.value} of {card.suit}</div>
    </div>
  )
}
