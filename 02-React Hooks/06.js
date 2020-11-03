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

// error boundary component
class ErrorBoundary extends React.Component {
  state = {
    error: null,
  }
  static getDerivedStateFromError(error) {
    return {error}
  }
  render() {
    const {error} = this.state
    if (error) {
      // fallback ui
      return <this.props.fallbackComponent error={error} />
    }
    return this.props.children
  }
}
function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  //! exercise start
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: '',
  })
  React.useEffect(() => {
    // this will run AFTER the browser paints
    if (!pokemonName) return
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({pokemon, status: 'successful'})
      },
      error => {
        setState({status: 'rejected', error})
      },
    )

    return function cleanup() {
      setState({status: 'idle', pokemon: null})
    }
    // only run if our pokemonName changes, this is the state we are synced with
  }, [pokemonName])
  const {pokemon, status, error} = state
  if (status === 'idle') return <h1>Please Select a Pokemon</h1>
  else if (status === 'rejected') throw error

  return pokemon ? (
    <PokemonDataView pokemon={pokemon} />
  ) : (
    <PokemonInfoFallback name={pokemonName} />
  )
  //! if network quest was successful then we return dataview, otherwise we return infofallback
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary fallbackComponent={ErrorFallback} key={pokemonName}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
