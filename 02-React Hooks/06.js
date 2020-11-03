// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

function PokemonInfo({ pokemonName }) {
  //! exercise start
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: '',
  });
  React.useEffect(() => {
    // this will run AFTER the browser paints
    if (!pokemonName) return;
    setState({ status: 'pending' });
    fetchPokemon(pokemonName).then(
      (pokemon) => {
        setState({ pokemon, status: 'successful' });
      },
      (error) => {
        setState({ status: 'rejected', error });
      }
    );

    return function cleanup() {
      setState({ status: 'idle', pokemon: null });
    };
    // only run if our pokemonName changes, this is the state we are synced with
  }, [pokemonName]);
  const { pokemon, status, error } = state;
  if (status === 'idle') return <h1>Please Select a Pokemon</h1>;
  else if (status === 'rejected') throw error;

  return pokemon ? (
    <PokemonDataView pokemon={pokemon} />
  ) : (
    <PokemonInfoFallback name={pokemonName} />
  );
  //! if network quest was successful then we return dataview, otherwise we return infofallback
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setPokemonName('')}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
