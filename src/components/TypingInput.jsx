import { useRef, useEffect } from 'react'

export default function TypingInput({ value, onChange, disabled }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!disabled) ref.current?.focus()
  }, [disabled])

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      className="w-full font-mono text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 disabled:opacity-50 min-h-[120px]"
      placeholder="Start typing..."
    />
  )
}
