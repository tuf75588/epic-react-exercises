// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import React from 'react';

function UsernameForm({ onSubmitUsername }) {
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input by specifying an `id` on
  // the input and a matching value as an `htmlFor` prop on the label.

  //! dom ref
  const inputRef = React.useRef(null);
  //! event handler

  //! basic example
  function handleSubmit(event) {
    event.preventDefault();
    const input = event.target.elements[0].value;
    alert(input);
  }
  //! using a REF
  function handleRefSubmit(event) {
    event.preventDefault();
    const value = inputRef.current.value;
    alert(value);
  }

  //! using state to control the input to lower case only
  const [value, setValue] = React.useState('');
  //! change handler for our input to keep track of input state
  function handleChange({ target: { value } }) {
    setValue(value.toLowerCase());
  }
  function handleStateSubmit(event) {
    event.preventDefault();
    alert(value);
  }
  return (
    <form onSubmit={handleStateSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={value} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
      <div>{value}</div>
    </form>
  );
}

function App() {
  const onSubmitUsername = (username) => alert(`You entered: ${username}`);
  return <UsernameForm onSubmitUsername={onSubmitUsername} />;
}

export default App;
