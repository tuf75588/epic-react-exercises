// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react';
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon';

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null);
  const [status, setStatus] = React.useState('idle');

  React.useEffect(() => {
    setStatus('fetching');
    if (!pokemonName) return;
    fetchPokemon(pokemonName)
      .then((poki) => {
        setPokemon(poki);
        setStatus('success');
      })
      .catch((error) => {
        setStatus('failure');
        console.error(error);
      });
  }, [pokemonName]);
  if (!pokemonName) return <h1>Submit a Pokemon!</h1>;
  return pokemon ? (
    <PokemonDataView pokemon={pokemon} />
  ) : (
    <PokemonInfoFallback name={pokemonName} />
  );
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
