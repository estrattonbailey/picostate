import test from 'ava'
import createStore from './dist/picostate.js'

test.before(t => {
  t.context.store = createStore({ foo: true })
})

test('value exists', t => {
  t.is(t.context.store.state.foo, true)
})
test('value can be updated', t => {
  t.context.store.hydrate({ foo: false })
  t.is(t.context.store.state.foo, false)
})
test('listeners work', t => {
  t.context.store.listen(state => {
    t.is(t.context.store.state.foo, 'hello')
  })
  t.context.store.hydrate({ foo: 'hello' })()
})
test('onces work', t => {
  t.plan(1)
  t.context.store.listen(state => {
    t.pass()
  }, true)
  t.context.store.hydrate({ foo: 'hello' })()
  t.context.store.hydrate({ foo: 'hello' })()
})
test('state is immutable', t => {
  t.context.store.listen(state => {
    state.foo = 'some value' // won't mutate global state
    t.is(t.context.store.state.foo, 'world')
  })
  t.context.store.hydrate({ foo: 'world' })()
})
test('state can be reset', t => {
  t.context.store.hydrate()
  t.is(t.context.store.state.foo, true)
})
