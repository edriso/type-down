import { useState, useCallback } from 'react'

export function useTypingEngine(targetText) {
  const [input, setInput] = useState('')
  const [totalKeystrokes, setTotalKeystrokes] = useState(0)
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0)

  const handleInput = useCallback(
    (newValue) => {
      const newChar = newValue.slice(-1)
      const charIndex = newValue.length - 1

      if (newValue.length > input.length) {
        setTotalKeystrokes((k) => k + 1)
        if (newChar === targetText[charIndex]) {
          setCorrectKeystrokes((k) => k + 1)
        }
      }

      setInput(newValue)
    },
    [input.length, targetText],
  )

  const isComplete = input.length >= targetText.length && targetText.length > 0

  const reset = useCallback(() => {
    setInput('')
    setTotalKeystrokes(0)
    setCorrectKeystrokes(0)
  }, [])

  return {
    input,
    handleInput,
    totalKeystrokes,
    correctKeystrokes,
    isComplete,
    reset,
  }
}
