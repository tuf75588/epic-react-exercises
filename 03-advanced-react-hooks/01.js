import * as React from 'react';

//* EC-2 simulate setState with an object
const useStateReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        ...state,
        count: action.count,
      };
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
function Counter({ step = 1 }) {
  const [state, setState] = useState({ count: 4 });
  const increment = () =>
    setState({ type: 'INCREMENT', count: state.count + step });
  return (
    <div>
      <p>the current count is {state.count}</p>
      <button onClick={increment}>click me</button>
    </div>
  );
}

function App() {
  return <Counter step={3} />;
}

export default App;
