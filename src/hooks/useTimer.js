import { useState, useRef, useCallback, useEffect } from 'react'

export function useTimer() {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)

  const start = useCallback(() => {
    if (intervalRef.current) return
    startTimeRef.current = Date.now() - elapsed * 1000
    intervalRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 200)
  }, [elapsed])

  const stop = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  useEffect(() => stop, [stop])

  const reset = useCallback(() => {
    stop()
    setElapsed(0)
    startTimeRef.current = null
  }, [stop])

  return { elapsed, start, stop, reset }
}
