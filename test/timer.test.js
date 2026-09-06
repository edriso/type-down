import assert from 'node:assert/strict'
import { test } from 'node:test'
import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { JSDOM } from 'jsdom'
import { useTimer } from '../src/hooks/useTimer.js'

test('timer starts once, stops, resets, and cleans up when leaving an exercise', async (t) => {
  const dom = new JSDOM('<div id="root"></div>')
  const previousWindow = globalThis.window
  const previousDocument = globalThis.document
  globalThis.window = dom.window
  globalThis.document = dom.window.document
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  let tick
  const setIntervalMock = t.mock.method(globalThis, 'setInterval', (callback) => {
    tick = callback
    return 42
  })
  const clearIntervalMock = t.mock.method(globalThis, 'clearInterval', () => {})
  let now = 1000
  t.mock.method(Date, 'now', () => now)
  let timer
  function Harness() {
    timer = useTimer()
    return null
  }
  const root = createRoot(document.getElementById('root'))
  try {
    await act(() => root.render(createElement(Harness)))
    await act(() => { timer.start(); timer.start() })
    assert.equal(setIntervalMock.mock.callCount(), 1)
    now = 3000
    await act(() => tick())
    assert.equal(timer.elapsed, 2)
    await act(() => timer.stop())
    assert.equal(clearIntervalMock.mock.calls.at(-1).arguments[0], 42)
    await act(() => timer.reset())
    assert.equal(timer.elapsed, 0)
    await act(() => timer.start())
    assert.equal(setIntervalMock.mock.callCount(), 2)
    const callsBeforeUnmount = clearIntervalMock.mock.callCount()
    await act(() => root.unmount())
    assert.equal(clearIntervalMock.mock.callCount(), callsBeforeUnmount + 1)
    assert.equal(clearIntervalMock.mock.calls.at(-1).arguments[0], 42)
  } finally {
    globalThis.window = previousWindow
    globalThis.document = previousDocument
    delete globalThis.IS_REACT_ACT_ENVIRONMENT
    dom.window.close()
  }
})
