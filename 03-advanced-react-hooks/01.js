import * as React from 'react'

//* EC-2 simulate setState with an object
const useStateReducer = (state, action) => {
  return {
    ...state,
    ...(typeof action === 'function' ? action(state) : action),
  }
}
function useState(initialValue) {
  //! third argument useReducer accepts is a lazy initializer function

  return React.useReducer(useStateReducer, initialValue, useStateInitializer)
}

function useStateInitializer(initialArg) {
  return typeof initialArg === 'function' ? initialArg() : initialArg
}
function Counter({step = 1}) {
  const [state, setState] = useState({count: 4})
  const increment = () =>
    setState(currentState => ({
      type: 'INCREMENT',
      count: currentState.count + step,
    }))
  return (
    <div>
      <p>the current count is {state.count}</p>
      <button onClick={increment}>click me</button>
    </div>
  )
}

function App() {
  return <Counter step={4} />
}

export default App
