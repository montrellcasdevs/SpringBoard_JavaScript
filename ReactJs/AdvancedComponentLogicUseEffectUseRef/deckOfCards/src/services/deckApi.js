const BASE = 'https://deckofcardsapi.com/api/deck'

export async function newDeck() {
  const res = await fetch(`${BASE}/new/shuffle/?deck_count=1`)
  return res.json()
}

export async function drawFromDeck(deckId, count = 1) {
  const res = await fetch(`${BASE}/${deckId}/draw/?count=${count}`)
  return res.json()
}

export async function shuffleDeck(deckId) {
  const res = await fetch(`${BASE}/${deckId}/shuffle/`)
  return res.json()
}

export default { newDeck, drawFromDeck, shuffleDeck }
