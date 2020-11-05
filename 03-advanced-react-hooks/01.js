// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';

function countReducer(currentCount, newCount) {
  return newCount;
}

function Counter({ initialCount = 0, step = 1 }) {
  // 🐨 replace React.useState with React.useReducer.
  // 💰 React.useReducer(countReducer, initialCount)
  const [count, setCount] = React.useReducer(countReducer, initialCount);
  const increment = () => setCount(count + step);
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter step={5} />;
}

export default App;
