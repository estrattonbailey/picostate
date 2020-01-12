![repo-banner](https://user-images.githubusercontent.com/4732330/72222330-1e822b80-3529-11ea-8937-ddeaa5242414.png)

```bash
npm i picostate --save
```

<br />

Event-based immutable state management.

- 400 bytes
- familiar event based interface
- only fires listeners for _changed values_
- emits state updates _only when requested_
- integrates seamlessly with [React](https://github.com/estrattonbailey/picostate-react)

## Usage

Create a store:

```js
import createStore from "picostate";

const store = createStore({
  a: 0,
  b: false
});
```

Safely access state:

```js
store.state; // { a: 0, b: false }
```

Register a listener for any state changes:

```js
store.listen(state => console.log(state));
```

Register a listener only for changes to an array of props, in this case `b`:

```js
store.listen(["b"], state => console.log(state.b));
```

Update state:

```js
const emit = store.hydrate({ a: 1 });
```

Fire registered listeners:

```js
emit(); // { a: 1, b: false }
```

Update state and fire listeners:

```js
store.hydrate({ b: true })(); // { a: 1, b: true }, true
```

Update state using the previous state:

```js
store.hydrate(state => ({ a: state.a + 1 }))(); // { a: 2, b: true }
```

```js
const removeListener = store.listen(state => console.log(state));
store.hydrate({ a: 1 })(); // { a: 1, b: true }
removeListener();
store.hydrate({ a: 2 })(); // no listener fired
store.state; // { a: 2, b: true }
```

Reset to initial state:

```js
store.hydrate();
store.state; // { a: 0, b: false }
```

## License

MIT License © [Eric Bailey](https://estrattonbailey.com)
