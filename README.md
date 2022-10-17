<p align="center">
  <a href="https://codesandbox.io/s/ref-change-listener-m5bupr?file=/src/List.js">
    <img src="readme-header.svg"/ >
  </a>
</p>
<h3 align="center">👀 Watch <code>ref</code> changes with conditional re-renders</h3>
<p align='center'>(First draft - expect changes) <a href='https://codesandbox.io/s/ref-change-listener-m5bupr?file=/src/List.js'>Live demo</a></p>

---
<p align="center">
  <a href="https://codesandbox.io/s/ref-change-listener-m5bupr?file=/src/List.js">
    <img src='react-ref-watcher.apng'/>
  </a>
</p>

Use `useRef` instead of `useState` by allowing it to be watchable, so a component can choose to act
(re-render for example) when a change in the ref is detected.

This is helpful for keeping all the state at a top-level component, and pass it to the sub-components via *props* or *context*.

This solves the problem where a child updates a state defined at some top-level parent, which causes the parent to re-render and
possibly all the sub-tree as well, which is useless and even harmful for performance in many situations.

Each sub-component can register a listener for changes in a specific `ref` or any of its `current` property's properties
(assuming `current` points to a mutated Object/Array).

<br>

## Install with:

Use from [CDN](https://unpkg.com/@yaireo/react-ref-watcher) / Download from this repo / [NPM](https://www.npmjs.com/package/@yaireo/react-ref-watcher)

```bash
npm i @yaireo/react-ref-watcher -S
```

<br><br>

## What's in this package?

### 1️⃣ `useWatchableRef`

| Argument      | Type  | Info
|---------------|-------|-------------------------------------------------------------
| initialValue  | Any   | Same as the native `useRef`

Create a ref-like object that listens to any change in the `current` property
and fires all registered callbacks when a change happens to the `current` property.

Think of this as a regular `useRef` with the bonus of being watchable. See examples down.

```js
import {useWatchableRef} from '@yaireo/react-ref-watcher'

const Component = () => {
  const myRef = useWatchableRef(true)
}
```

<br>

### 2️⃣ `useWatchableListener`

| Argument | Type     | Info
|----------|----------|-------------------------------------------------------------
| ref      | Object   | an Object/Array to listen to
| propName | String   | (optional) specific property name to watch within the `ref`
| watcher  | function | (optional) argument, for custom watcher

Listens to refs changes.
By default will trigger a re-render in the component which is using this hook if
a change in the ref itself or specific property is detected.

In this example, assume `ref1` & `ref2` were created using `useWatchableRef`.

```js
import {useWatchableListener} from '@yaireo/react-ref-watcher'

const Component = ({ ref1 }) => {
  const {ref2} = useContext(MyContext) // getting a ref from somewhere up the tree

  useWatchableListener(ref1) // triggers a re-render when ref1 changes (assuming the `ref1.current` is pointing now a new pointer in memory)
  useWatchableListener(ref2.current, 'foo') // triggers a re-render when `foo` property changes in ref2.current (assuming ref2.current is an Object)
}
```

<br>

### 3️⃣ `useWatchableEffect`

| Argument      | Type     | Info
|---------------|----------|-------------------------------------------------------------
| callback      | Function | fires when a ref change detetced
| dependencies  | Array    | array of watchable refs

Listen to changes in a ref **without** triggering a re-render

```js
import {useWatchableEffect, useWatchableListener} from '@yaireo/react-ref-watcher'

const Component = ({ ref1, ref2 }) => {
  // when `ref1` changes, run the callback
  useWatchableEffect(() => {
    ref2.current = ref1 === 'foo';
  }, [ref1])

  // ref2 is dependend on ref1. Only when ref2 changes the component should re-render
  useWatchableListener(ref2)
}
```

<br>

### 4️⃣ `propWatcher`

Unlike the other hooks, this is a utility function which does the actual watching.
It adds an enumerable `__WATCHERS` property (will host callback listeners when changes detected)
on top of the argument (expected to be an *Object*) and then returns a new `proxy` which encapsulates the argument.

Every time a propery is modified or deleted (in your code) the proxy trap will fire and all
callback functions defined in the `__WATCHERS` property will fire.

Any Object may be wrapped with `propWatcher` to become "watchable" (not only React refs).
**Example of most basic usage:**

```js
import {propWatcher} from '@yaireo/react-ref-watcher'

const watchableRef = propWatcher({ current: true })
```


