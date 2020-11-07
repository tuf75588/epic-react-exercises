import * as React from 'react';

//* EC-2 simulate setState with an object
const useStateReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return state + action.count;
    }
    default: {
      return state;
    }
  }
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
