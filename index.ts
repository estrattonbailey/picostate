type HydrateFunction<S> = (s: S) => Partial<S>;
type Hydrate<S> = Partial<S> | HydrateFunction<S>;
type ListenerFunction<S> = (s: S) => any;

export default function createStore<State>(initialState: State) {
  let state = Object.assign({}, initialState);
  let listeners = new Map();

  return {
    get state(): State {
      return { ...state };
    },
    hydrate(fn?: Hydrate<State>): () => void {
      state = fn
        ? Object.assign(
            this.state,
            typeof fn === "function" ? fn(this.state) : fn
          )
        : initialState;

      return () => {
        listeners.forEach(([fn, once]) => {
          fn(this.state);
          once && listeners.delete(fn);
        });
      };
    },
    listen(fn: ListenerFunction<State>, once?: boolean): () => void {
      !listeners.has(fn) && listeners.set(fn, [fn, once]);
      return () => { listeners.delete(fn) };
    }
  };
}
