import { useEffect } from 'react'
import { getExerciseById, getExerciseText } from '../data/exercises'
import { useTypingEngine } from '../hooks/useTypingEngine'
import { useTimer } from '../hooks/useTimer'
import TargetDisplay from './TargetDisplay'
import TypingInput from './TypingInput'
import MarkdownPreview from './MarkdownPreview'
import StatsBar from './StatsBar'
import ExerciseComplete from './ExerciseComplete'

export default function TypingExercise({ exerciseId, onBack, onComplete }) {
  const exercise = getExerciseById(exerciseId)
  const targetText = getExerciseText(exercise)
  const { input, handleInput, totalKeystrokes, correctKeystrokes, isComplete, reset } =
    useTypingEngine(targetText)
  const { elapsed, start, stop, reset: resetTimer } = useTimer()

  useEffect(() => {
    if (input.length === 1) start()
  }, [input.length, start])

  useEffect(() => {
    if (isComplete) {
      stop()
      onComplete(exerciseId)
    }
  }, [isComplete, stop, exerciseId, onComplete])

  function handleRestart() {
    reset()
    resetTimer()
  }

  if (isComplete) {
    return (
      <ExerciseComplete
        elapsed={elapsed}
        correctKeystrokes={correctKeystrokes}
        totalKeystrokes={totalKeystrokes}
        charCount={input.length}
        onRestart={handleRestart}
        onBack={onBack}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            &larr; Back
          </button>
          <h2 className="text-lg font-semibold">{exercise.title}</h2>
        </div>
        <StatsBar
          elapsed={elapsed}
          correctKeystrokes={correctKeystrokes}
          totalKeystrokes={totalKeystrokes}
          charCount={input.length}
        />
      </div>

      <TargetDisplay target={targetText} input={input} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-medium text-gray-400 mb-1">YOUR INPUT</div>
          <TypingInput value={input} onChange={handleInput} disabled={isComplete} />
        </div>
        <div>
          <div className="text-xs font-medium text-gray-400 mb-1">PREVIEW</div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg min-h-[120px] bg-white dark:bg-gray-900">
            <MarkdownPreview content={input} />
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400 text-center">
        {input.length} / {targetText.length} characters
      </div>
    </div>
  )
}
