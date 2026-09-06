import assert from 'node:assert/strict'
import { test } from 'node:test'
import { calculateWPM, calculateAccuracy, getCharStatus } from '../src/utils/typing.js'
import { exercises, getExerciseById, getExerciseText } from '../src/data/exercises.js'

test('typing statistics handle a fresh exercise and recorded mistakes', () => {
  assert.equal(calculateWPM(0, 0), 0)
  assert.equal(calculateWPM(250, 60), 50)
  assert.equal(calculateAccuracy(0, 0), 100)
  assert.equal(calculateAccuracy(9, 10), 90)
  assert.equal(getCharStatus('abc', 'ax', 0), 'correct')
  assert.equal(getCharStatus('abc', 'ax', 1), 'incorrect')
  assert.equal(getCharStatus('abc', 'ax', 2), 'pending')
})

test('every selectable exercise resolves to nonempty Markdown', () => {
  assert.equal(new Set(exercises.map(({ id }) => id)).size, exercises.length)
  for (const exercise of exercises) {
    assert.equal(getExerciseById(exercise.id), exercise)
    assert.ok(getExerciseText(exercise).length > 0)
  }
})
