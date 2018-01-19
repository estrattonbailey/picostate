export default function createStore (initialState) {
  const state = initialState
  const handlers = []

  return {
    get state () {
      return state
    },
    hydrate (fn) {
      Object.assign(state, typeof fn === 'function' ? fn(state) : fn)
      return function () {
        for (let fn of handlers) fn(state)
      }
    },
    listen (fn) {
      handlers.push(fn)
      return () => handlers.slice(handlers.indexOf(fn), 1)
    }
  }
}
