# picostate
261 byte framework agnostic immutable state manager.

> Why `picostate`? Valid question. There are a lot of options out there for state
> management, and many do too much in my opinion. `picostate` aims to be the smallest
> possible building block, upon which other libraries can be built. However,
> it's also easy to integrate directly into most applications.

### Features
- tiny size
- simple event based interface
- lazy-updating

```javascript
import createStore from 'picostate'

const store = createStore({ count: 0 })

store.listen(state => {
  console.log('the count is ', state.count)
})

store.hydrate({ count: 1 })

const runListeners = store.hydrate(state => ({ count: state.count + 1 }))

runListeners() // The count is 2
```

### Integrations
- [@picostate/react](https://github.com/estrattonbailey/picostate-react)

# Usage
`picostate` is dead simple. First, create a store with initial state:
```javascript
import createStore from 'picostate'

const store = createStore({ count: 0 })
```

You can access the state object directly:
```javascript
store.state // { count: 0 }
```

### Listeners
To add a listener, pass a function to the `listen` method:
```javascript
store.listen(state => {
  console.log('the count is ', state.count)
})
```

Listeners return a function that will unregister itself when called:
```javascript
const unregister = store.listen(state => {
  console.log('the count is ', state.count)
})
unregister()
```

Listeners can also be fired once, and then automatically unregistered:
```javascript
store.listen(state => console.log('fires once'), true)
```

### Updating state
All state updates happen via the `hydrate` method.

To update state, but _not_ run any listeners:
```javascript
store.hydrate({ count: 1 })
```

To run all listeners, use the function returned from `hydrate`:
```javascript
const runListeners = store.hydrate(state => ({ count: state.count + 1 }))
runListeners() // The count is 2
```

### Cleanup
To reset the store to its initial state, call hydrate with a falsy value:
```javascript
store.hydrate()
```

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
