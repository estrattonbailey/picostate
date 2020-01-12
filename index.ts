type HydrateFunction<S> = (s: S) => Partial<S>;
type Hydrate<S> = Partial<S> | HydrateFunction<S>;
type ListenerFunction<S> = (s: S) => any;

export default function createStore<State>(initialState: Partial<State>) {
  let state = Object.assign({}, initialState);
  let lastFiredState = Object.assign({}, initialState);
  let listeners = {};

  return {
    get state(): Partial<State> {
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
        const changed = Object.keys(state).reduce((keys, key) => {
          if (state[key] !== lastFiredState[key]) return keys.concat(key);
          return keys;
        }, []);

        lastFiredState = state;

        if (!changed.length) return;

        const fired = [];

        for (const key of changed.concat("*")) {
          for (const fn of listeners[key] || []) {
            if (fired.indexOf(fn) > -1) continue;
            fn({ ...state });
            fired.push(fn);
          }
        }
      };
    },
    listen(
      evs: string | string[] | ListenerFunction<State>,
      fn?: ListenerFunction<State>
    ): () => void {
      if (!fn && typeof evs === "function") {
        fn = evs;
        evs = "*";
      }

      const keys = [].concat(evs);

      for (const key of keys) {
        listeners[key] = (listeners[key] || []).concat(fn);
      }

      return () => {
        for (const key of keys) {
          listeners[key].splice(listeners[key].indexOf(fn), 1);
        }
      };
    }
  };
}
