import * as React from 'react';

//* EC-2 simulate setState with an object
const useStateReducer = (previousState, dispatchArg) => {
  return dispatchArg;
};
function useState(initialValue) {
  return React.useReducer(useStateReducer, initialValue);
}
function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
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
