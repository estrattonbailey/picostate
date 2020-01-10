import test from 'ava'
import createStore from './index'

const store = createStore<{
  foo: boolean;
  bar: string;
}>({ foo: true, bar: 'string' });

test('value exists', t => {
  t.is(store.state.foo, true)
})
test('value can be updated', t => {
  store.hydrate({ foo: false })
  t.is(store.state.foo, false)
})
test('listeners work', t => {
  store.listen(state => {
    t.is(store.state.bar, 'hello')
  })
  store.hydrate({ bar: 'hello' })()
})
test('onces work', t => {
  t.plan(1)
  store.listen(state => {
    t.pass()
  }, true)
  store.hydrate({ bar: 'hello' })()
  store.hydrate({ bar: 'hello' })()
})
test('state is immutable', t => {
  store.listen(state => {
    state.bar = 'some value' // won't mutate global state
    t.is(store.state.bar, 'world')
  })
  store.hydrate({ bar: 'world' })()
})
test('state can be reset', t => {
  store.hydrate()
  t.is(store.state.foo, true)
})