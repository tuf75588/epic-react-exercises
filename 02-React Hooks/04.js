// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react';

function Board() {
  // 🐨 squares is the state for this component. Add useState for squares
  // to keep track of squares state
  const [squares, setSquares] = React.useState(() => {
    // check if we have some localStorage we can pull from first
    const game = JSON.parse(window.localStorage.getItem('squares'));
    if (game.indexOf('X') !== -1 || game.indexOf('O') !== -1) {
      console.log('previous');
      console.log(game);
      return game.map((x) => x);
    }
    return Array(9).fill(null);
  });
  // these three variables represent "derived state"
  // meaning values we find off of EXISTING STATE

  // the opposite would be "managed state"
  // which is state we more directly manage
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)

  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables
  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    //
    // 🦉 It's typically a bad idea to manipulate state in React because that
    // can lead to subtle bugs that can easily slip into productions.
    // 🐨 make a copy of the squares array (💰 `[...squares]` will do it!)
    // 🐨 Set the value of the square that was selected
    // 💰 `squaresCopy[square] = nextValue`
    //
    // 🐨 set the squares to your copy
    const squaresCopy = [...squares];

    //! how do we determine if there's a value on a given square already?
    //! check if either winner or that particular index is truthy to see if we should return early.
    if (squaresCopy[square] || winner) return;
    squaresCopy[square] = nextValue;
    // fill selected square with either X or O
    // update state
    setSquares(squaresCopy);
  }

  function restart() {
    // 🐨 set the squares to `Array(9).fill(null)`
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }
  // let's work on preserving our game in localStorage
  React.useEffect(() => {
    window.localStorage.setItem('squares', JSON.stringify(squares));
  }, [squares]);
  return (
    <div>
      {/* 🐨 put the status here */}
      <div className="status">STATUS: {status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter((r) => r === 'X').length;
  const oSquaresCount = squares.filter((r) => r === 'O').length;
  return oSquaresCount === xSquaresCount ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
