import { useEffect, useRef, useCallback } from 'react'

// drawFn should be an async function that returns `true` when a card was drawn
// or `false` when no more cards remain (or on failure where auto-draw should stop)
export default function useAutoDraw(drawFn, isActive, onStop, ms = 1000) {
  const intervalRef = useRef(null)
  const runningRef = useRef(false)

  const start = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      if (runningRef.current) return
      runningRef.current = true
      Promise.resolve()
        .then(() => drawFn())
        .then((result) => {
          if (result === false) {
            // stop interval and notify
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
            onStop && onStop()
          }
        })
        .catch((err) => {
          console.error('Auto-draw error:', err)
        })
        .finally(() => {
          runningRef.current = false
        })
    }, ms)
  }, [drawFn, ms, onStop])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isActive) start()
    else stop()
    return stop
  }, [isActive, start, stop])

  return { start, stop, isRunning: !!intervalRef.current }
}
