import { calculateWPM, calculateAccuracy } from '../utils/typing'

export default function StatsBar({ elapsed, correctKeystrokes, totalKeystrokes, charCount }) {
  const wpm = calculateWPM(charCount, elapsed)
  const accuracy = calculateAccuracy(correctKeystrokes, totalKeystrokes)
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const seconds = String(elapsed % 60).padStart(2, '0')

  return (
    <div className="flex gap-6 text-sm font-mono">
      <Stat label="WPM" value={wpm} />
      <Stat label="ACC" value={`${accuracy}%`} />
      <Stat label="TIME" value={`${minutes}:${seconds}`} />
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400 text-xs">{label}</span>
      <span className="font-semibold text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  )
}
