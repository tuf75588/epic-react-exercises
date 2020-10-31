// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({status: 'idle', pokemon: null})
  React.useEffect(() => {
    setState(prev => ({...prev, status: 'pending'}))
    if (!pokemonName) return
    fetchPokemon(pokemonName)
      .then(poki => {
        setState(() => {
          return {status: 'resolved', pokemon: poki}
        })
      })
      .catch(error => {
        setState(previous => ({
          ...previous,
          status: 'failure',
          error: error.message,
        }))
      })
  }, [pokemonName])

  const {status, pokemon, error} = state
  if (!pokemonName) return <h1>Submit a Pokemon!</h1>

  return pokemon ? (
    <PokemonDataView pokemon={pokemon} />
  ) : (
    <div>
      {error}
      <PokemonInfoFallback name={pokemonName} />
    </div>
  )
}

// error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }
  static getDerivedStateFromError(error) {
    return {hasError: true}
  }
  componentDidCatch(error, errorInfo) {
    console.error({error, errorInfo})
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>
    }
    return this.props.children
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <ErrorBoundary key={pokemonName}>
      <div className="pokemon-info-app">
        <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
        <hr />
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
