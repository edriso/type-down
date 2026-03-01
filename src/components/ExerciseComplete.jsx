import { calculateWPM, calculateAccuracy } from '../utils/typing'
import TargetDisplay from './TargetDisplay'
import MarkdownPreview from './MarkdownPreview'

export default function ExerciseComplete({
  elapsed,
  correctKeystrokes,
  totalKeystrokes,
  charCount,
  input,
  target,
  onRestart,
  onBack,
}) {
  const wpm = calculateWPM(charCount, elapsed)
  const accuracy = calculateAccuracy(correctKeystrokes, totalKeystrokes)

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Exercise Complete</h2>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
          <ResultCard label="WPM" value={wpm} />
          <ResultCard label="Accuracy" value={`${accuracy}%`} />
          <ResultCard
            label="Time"
            value={`${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`}
          />
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            All Exercises
          </button>
        </div>
      </div>

      <div>
        <div className="text-xs font-medium text-gray-400 mb-1">YOUR RESULT</div>
        <TargetDisplay target={target} input={input} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-medium text-gray-400 mb-1">WHAT YOU TYPED</div>
          <pre className="font-mono text-sm bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 whitespace-pre-wrap overflow-auto min-h-[120px]">
            {input}
          </pre>
        </div>
        <div>
          <div className="text-xs font-medium text-gray-400 mb-1">MARKDOWN PREVIEW</div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg min-h-[120px] bg-white dark:bg-gray-900">
            <MarkdownPreview content={input} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultCard({ label, value }) {
  return (
    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  )
}
