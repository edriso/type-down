import { useState, useCallback } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Header from './components/Header'
import ModeSelector from './components/ModeSelector'
import TypingExercise from './components/TypingExercise'

function App() {
  const [darkMode, setDarkMode] = useLocalStorage('typedown-dark', false)
  const [completedExercises, setCompletedExercises] = useLocalStorage('typedown-completed', [])
  const [currentExercise, setCurrentExercise] = useState(null)

  const handleComplete = useCallback(
    (exerciseId) => {
      setCompletedExercises((prev) =>
        prev.includes(exerciseId) ? prev : [...prev, exerciseId],
      )
    },
    [setCompletedExercises],
  )

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode((d) => !d)} />
        <main className="p-6">
          {currentExercise ? (
            <TypingExercise
              key={currentExercise}
              exerciseId={currentExercise}
              onBack={() => setCurrentExercise(null)}
              onComplete={handleComplete}
            />
          ) : (
            <ModeSelector
              onSelect={setCurrentExercise}
              completedExercises={completedExercises}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
