// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react';

function Greeting({ initialName = 'yex' }) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  // const [name, setName] = React.useState(
  //   initialName || window.localStorage.getItem('name'),
  // )
  // const [name, setName] = React.useState(() => {
  //   //! lazy initializer for react to check if initialName is already supplied
  //   if (initialName) {
  //     return initialName
  //   } else {
  //     const localStorageName = window.localStorage.getItem('name')
  //     if (localStorageName) {
  //       return localStorageName
  //     }
  //   }
  // })

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.

  // 💰 window.localStorage.setItem('name', name)
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])
  /* 
  EXTRA CREDIT 
  */
  const [name, setName] = React.useState(() => {
    console.log('only running once!');
    const name = window.localStorage.getItem('name');
    if (name !== undefined) return name;
    return initialName;
  });
  React.useEffect(() => {
    window.localStorage.setItem('name', name);
  }, [name]);
  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
