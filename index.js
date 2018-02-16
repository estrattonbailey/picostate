export default function createStore (initialState) {
  let state = initialState
  let handlers = []

  return {
    get state () {
      return state
    },
    hydrate (fn) {
      state = Object.assign({}, state, typeof fn === 'function' ? fn(state) : fn)
      return function (done) {
        for (let fn of handlers) fn(state)
        done && setTimeout(done, 0)
      }
    },
    listen (fn) {
      handlers.indexOf(fn) < 0 && handlers.push(fn)
      return () => handlers.slice(handlers.indexOf(fn), 1)
    },
    reset () {
      state = initialState
      handlers = []
    }
  }
}
