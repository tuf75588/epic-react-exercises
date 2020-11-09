// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'

// 🐨 this is going to be our generic asyncReducer
function pokemonInfoReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      // 🐨 replace "pokemon" with "data"
      return {status: 'pending', pokemon: null, error: null}
    }
    case 'resolved': {
      // 🐨 replace "pokemon" with "data" (in the action too!)
      return {status: 'resolved', pokemon: action.pokemon, error: null}
    }
    case 'rejected': {
      // 🐨 replace "pokemon" with "data"
      return {status: 'rejected', pokemon: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync(asyncCallback, status, deps) {
  const [state, dispatch] = React.useReducer(pokemonInfoReducer, {
    ...status,
    data: null,
    error: null,
  })
  const pokemonData = React.useCallback(() => {
    asyncCallback()
  }, [state.data])
  React.useEffect(() => {
    pokemonData()
  }, [pokemonData])
}

function PokemonInfo({pokemonName}) {
  const state = useAsync(() => {
    if (!pokemonName) return
    return fetchPokemon(pokemonName)
  })
  console.log(state)
  // 🐨 move both the useReducer and useEffect hooks to a custom hook called useAsync
  // here's how you use it:
  // const state = useAsync(
  //   () => {
  //     if (!pokemonName) {
  //       return
  //     }
  //     return fetchPokemon(pokemonName)
  //   },
  //   {status: pokemonName ? 'pending' : 'idle'},
  //   [pokemonName],
  // )
  // 🐨 so your job is to create a useAsync function that makes this work.

  // 🐨 this will change from "pokemon" to "dat

  // if (status === 'idle' || !pokemonName) {
  //   return 'Submit a pokemon'
  // } else if (status === 'pending') {
  //   return <PokemonInfoFallback name={pokemonName} />
  // } else if (status === 'rejected') {
  //   throw error
  // } else if (status === 'resolved') {
  //   return <PokemonDataView pokemon={pokemon} />
  // }

  // throw new Error('This should be impossible')
  return <div>placeholder</div>
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
