export default function createStore (initialState = {}) {
  let state = Object.assign({}, initialState)
  let listeners = new Map()

  return {
    get state () {
      return Object.assign({}, state || initialState)
    },
    hydrate (fn) {
      state = fn ? Object.assign(this.state, typeof fn === 'function' ? fn(this.state) : fn) : fn

      return done => {
        const s = this.state
        listeners.forEach(([ fn, once ]) => {
          fn(s)
          once && listeners.delete(fn)
        })
        done && done(s)
      }
    },
    listen (fn, once) {
      !listeners.has(fn) && listeners.set(fn, [fn, once])
      return () => listeners.delete(fn)
    }
  }
}
