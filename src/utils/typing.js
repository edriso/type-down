export function calculateWPM(charCount, elapsedSeconds) {
  if (elapsedSeconds === 0) return 0
  const words = charCount / 5
  const minutes = elapsedSeconds / 60
  return Math.round(words / minutes)
}

export function calculateAccuracy(correctChars, totalChars) {
  if (totalChars === 0) return 100
  return Math.round((correctChars / totalChars) * 100)
}

export function getCharStatus(target, input, index) {
  if (index >= input.length) return 'pending'
  return input[index] === target[index] ? 'correct' : 'incorrect'
}

export function difficultyColor(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 'text-green-500'
    case 'medium':
      return 'text-yellow-500'
    case 'hard':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}
