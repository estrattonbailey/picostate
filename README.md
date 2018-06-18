# picostate
250 byte state management.

## Install
```bash
npm i picostate --save
```

# Usage
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
store.once(state => console.log('Only fires once:', state))
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
Run callback on the next tick after update:
```javascript
store.hydrate({
  count: 1
})(() => console.log('Updated!'))
```
Unlisten:
```javascript
unlisten() // => undefined
```
Reset to initial state:
```javascript
store.reset()
```
Replace entire state object (use caution):
```javascript
store.replace({ count: 0 })
```

# Usage With UI Libraries
- React - [@picostate/react](https://github.com/estrattonbailey/picostate-react)

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
