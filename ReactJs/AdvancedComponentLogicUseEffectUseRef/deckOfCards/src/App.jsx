import { useRef, useState } from 'react'
import './App.css'
import Controls from './components/Controls'
import CardList from './components/CardList'
import useDeck from './hooks/useDeck'
import useAutoDraw from './hooks/useAutoDraw'

function App() {
  const { remaining, cards, loading, shuffling, drawCard, shuffleDeck } = useDeck()
  const [isAutoDrawing, setIsAutoDrawing] = useState(false)
  const drawButtonRef = useRef(null)

  // Wrapper keeps focus on the draw button and returns draw result
  const wrappedDraw = async () => {
    const result = await drawCard()
    if (drawButtonRef.current) drawButtonRef.current.focus()
    if (result === false) alert('Error: no cards remaining!')
    return result
  }

  // useAutoDraw manages the interval and stops when draw returns false
  useAutoDraw(wrappedDraw, isAutoDrawing, () => setIsAutoDrawing(false), 1000)

  function toggleAutoDraw() {
    setIsAutoDrawing((s) => !s)
  }

  return (
    <div className="App" style={{padding:20}}>
      <h1>Deck of Cards — Draw a Card</h1>

      <Controls
        drawCard={wrappedDraw}
        shuffleDeck={shuffleDeck}
        toggleAutoDraw={toggleAutoDraw}
        isAutoDrawing={isAutoDrawing}
        shuffling={shuffling}
        loading={loading}
        remaining={remaining}
        drawButtonRef={drawButtonRef}
      />

      <CardList cards={cards} />
    </div>
  )
}

export default App
