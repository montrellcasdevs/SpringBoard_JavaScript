import { useCallback, useEffect, useState } from 'react'
import { newDeck, drawFromDeck, shuffleDeck as shuffleApi } from '../services/deckApi'

export default function useDeck() {
  const [deckId, setDeckId] = useState(null)
  const [remaining, setRemaining] = useState(0)
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [shuffling, setShuffling] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    newDeck()
      .then((data) => {
        if (!mounted) return
        setDeckId(data.deck_id)
        setRemaining(data.remaining)
      })
      .catch((err) => console.error('Failed to get deck:', err))
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const drawCard = useCallback(async () => {
    if (!deckId) return false
    if (remaining === 0) return false

    try {
      const data = await drawFromDeck(deckId, 1)
      if (!data.success) return false
      const card = data.cards[0]
      setCards((c) => [card, ...c])
      setRemaining(data.remaining)
      return true
    } catch (err) {
      console.error('Draw failed:', err)
      return false
    }
  }, [deckId, remaining])

  const shuffleDeck = useCallback(async () => {
    if (!deckId) return false
    setShuffling(true)
    try {
      const data = await shuffleApi(deckId)
      if (data.success) {
        setCards([])
        setRemaining(data.remaining)
        return true
      }
      return false
    } catch (err) {
      console.error('Shuffle error:', err)
      return false
    } finally {
      setShuffling(false)
    }
  }, [deckId])

  return {
    deckId,
    remaining,
    cards,
    loading,
    shuffling,
    drawCard,
    shuffleDeck,
  }
}
