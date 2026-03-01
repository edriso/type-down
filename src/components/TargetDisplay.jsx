import { getCharStatus } from '../utils/typing'

export default function TargetDisplay({ target, input }) {
  return (
    <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 select-none">
      {target.split('').map((char, i) => {
        const status = getCharStatus(target, input, i)
        const isCursor = i === input.length
        return (
          <span
            key={i}
            className={`${
              status === 'correct'
                ? 'text-green-600 dark:text-green-400'
                : status === 'incorrect'
                  ? 'bg-red-200 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                  : 'text-gray-400 dark:text-gray-500'
            } ${isCursor ? 'border-l-2 border-indigo-500 animate-pulse' : ''}`}
          >
            {char}
          </span>
        )
      })}
    </div>
  )
}
