import test from 'ava'
import createStore from './index'

const store = createStore<{
  foo: boolean;
  bar: string;
  a: string;
  b: string;
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
test('can listen to a single prop', t => {
  t.plan(1)
  store.listen('a', () => {
    t.pass();
  });
  store.hydrate({ a: 'a' })()
  store.hydrate({ bar: 'bar' })() // won't trigger 'a'
})
test('can listen to multiple props', t => {
  t.plan(3)

  store.listen(['a', 'b'], () => {
    t.pass();
  });

  store.hydrate({ a: 'aa' })()
  store.hydrate({ b: 'bb' })()
  store.hydrate({ a: 'aaa', b: 'bbb' })()

  store.hydrate({ bar: 'bar' })() // won't trigger any
})
test('listeners only fire if a value changed', t => {
  t.plan(1);
  store.listen(state => {
    t.pass();
  })
  store.hydrate({ bar: 'hello' })()
  store.hydrate({ bar: 'hello' })() // same value as before
})
test('listeners only fire if a value changed since last fired', t => {
  t.plan(1);
  store.listen(state => {
    t.pass();
  })
  store.hydrate({ bar: 'hydrated value' })
  // should fire even though didn't change since last hydrate
  store.hydrate({ bar: 'hydrated value' })()
})
test('listeners lazy fire their value changed since last fired', t => {
  store.listen(['a', 'b'], state => {
    t.is(state.a, 'fire value')
    t.is(state.b, 'new')
  })
  store.hydrate({ a: 'new' })
  store.hydrate({ b: 'new' })
  store.hydrate({ a: 'fire value' })()
})

test('listeners can be removed', t => {
  t.plan(1)
  const remove = store.listen(state => {
    t.pass()
  })
  store.hydrate({ bar: 'some string' })()
  remove()
  store.hydrate({ bar: 'foo' })()
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
