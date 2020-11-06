// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';

//* EC-2 simulate setState with an object
const useStateReducer = (previousState, newState) => {
  return typeof newState === 'function' ? newState(previousState) : newState;
};
function useState(initialValue) {
  //! third argument useReducer accepts is a lazy initializer function

  return React.useReducer(useStateReducer, initialValue, useStateInitializer);
}

function useStateInitializer(initialArg) {
  return typeof initialArg === 'function' ? initialArg() : initialArg;
}
function Counter() {
  const [count, setCount] = useState(() => 15);
  const increment = () => setCount((c) => c + 15);
  return (
    <div>
      <p>the current count is {count}</p>
      <button onClick={increment}>click me</button>
    </div>
  );
}

function App() {
  return <Counter />;
}

export default App;
