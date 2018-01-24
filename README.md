# picostate
200 byte state management.

## Install
```bash
npm i picostate --save
```

## Usage
Create a store with initial state:
```javascript
import createStore from 'picostate'

const store = createStore({
  count: 0
})
```
Retrieve the store's state (cannot be mutated):
```javascript
store.state // => { count: 0 }
```
Add listener(s):
```javascript
const unlisten = store.listen(state => console.log('Updated:', state))
```
Update state:
```javascript
const emitUpdate = store.hydrate({ count: 1 })
// or
const emitUpdate = store.hydrate(state => ({ count: state.count + 1 }))
```
Trigger listener(s):
```javascript
emitUpdate() // => Updated: { count: 1 }
```
Unlisten:
```javascript
unlisten() // => undefined
```
Reset to initial state:
```javascript
store.reset()
```

## Usage with UI Libraries
Trigger a re-render when the state updates:
```javascript
import React from 'react'
import { render } from 'react-dom'
import createStore from 'picostate'

const store = createStore({
  count: 0
})

const App = props => (
  <div>
    <h1>The count is: {props.count}</h1>

    <button onClick={e => {
      store.hydrate(state => ({
        count: state.count + 1
      }))()
    }}>Up</button>
  </div>
)

function update (state) {
  render(<App {...state} />, document.body)
}

update(store.state) // initial render

store.listen(update) // re-render on update
```

MIT
