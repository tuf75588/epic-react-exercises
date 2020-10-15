// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useEffect } from 'react';

// writing a custom hook

function Greeting({ initialName = '' }) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName

  //#region exercise solution #1

  const initialState = window.localStorage.getItem('name') || initialName;
  const [nameBackup, setNameBackup] = React.useState(initialState);
  React.useEffect(() => {
    window.localStorage.setItem('name', nameBackup);
  });
  //#endregion

  //#region Extra credit #1 solution

  const [nameTwo, setNameTwo] = React.useState(() => {
    // will only run on very first render
    const name = window.localStorage.getItem('name');
    if (name) return name;
    return initialName;
  });
  React.useEffect(() => {
    window.localStorage.setItem('name', nameTwo);
  }, [nameTwo]);
  //#endregion

  //#region Extra credit #2 solution
  function useLocalStorageState(initialName) {
    const [name, setName] = React.useState(() => {
      const storageName = window.localStorage.getItem('name');
      console.log(storageName);
      if (storageName) return storageName;
      return initialName;
    });
    React.useEffect(() => {
      window.localStorage.setItem('name', name);
    }, [name]);

    return [name, setName];
  }

  //#endregion
  //* const [nameThree, setNameThree] = useLocalStorageState(initialName)

  function useBetterLocalStorage(key, initialValue) {
    const [name, setName] = React.useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(name));
    });
    return [name, setName];
  }
  const [nameFour, setNameFour] = useBetterLocalStorage('name', 'andrew');
  function handleChange(event) {
    setNameFour(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {nameFour ? <strong>Hello {nameFour}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
