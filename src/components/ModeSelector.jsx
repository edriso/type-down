import { exercises } from '../data/exercises'
import { difficultyColor } from '../utils/typing'

export default function ModeSelector({ onSelect, completedExercises }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose an Exercise</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Practice typing real Markdown syntax
        </p>
      </div>
      <div className="grid gap-3">
        {exercises.map((exercise) => {
          const done = completedExercises.includes(exercise.id)
          return (
            <button
              key={exercise.id}
              onClick={() => onSelect(exercise.id)}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
            >
              <div>
                <div className="font-medium flex items-center gap-2">
                  {exercise.title}
                  {done && <span className="text-green-500 text-xs">done</span>}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {exercise.description}
                </div>
              </div>
              <span className={`text-xs font-medium ${difficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
