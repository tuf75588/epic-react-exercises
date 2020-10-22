// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'

function Board({squares, onClick}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }
  // let's work on preserving our game in localStorage
  React.useEffect(() => {
    window.localStorage.setItem('squares', JSON.stringify(squares))
  }, [squares])
  return (
    <div>
      {/* 🐨 put the status here */}
      <div className="status">STATUS:</div>
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
    </div>
  )
}

function Game() {
  const [history, setHistory] = React.useState([{squares: Array(9).fill(null)}])
  const [stepNumber, setStepNumber] = React.useState(0)
  const [xIsNext, setXIsNext] = React.useState(true)
  const [status, setStatus] = React.useState('')
  const handleClick = i => {
    const hist = history.slice(0, stepNumber + 1)
    const current = hist[hist.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'

    setHistory(hist.concat([{squares}]))
    setStepNumber(hist.length)
    setXIsNext(!xIsNext)
  }

  const jumpTo = step => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  let current = history[stepNumber]
  let winner = 0
  React.useEffect(() => {
    current = history[stepNumber]
    winner = calculateWinner(current.squares)

    if (winner) {
      setStatus('Winner: ' + winner)
    } else {
      setStatus('Next player: ' + (xIsNext ? 'X' : 'O'))
    }
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={history.squares} onClick={selectSquare} />
        <button
          className="restart"
          onClick={() => setHistory(Array(9).fill(null))}
        >
          restart
        </button>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  console.log({squares})
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
