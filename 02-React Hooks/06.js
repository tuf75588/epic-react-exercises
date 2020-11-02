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
  const [state, setState] = React.useState({ status: 'idle', pokemon: null });
  React.useEffect(() => {
    // this will run AFTER the browser paints
    if (!pokemonName) return;
    setState((prev) => ({ ...prev, status: 'pending' }));
    fetchPokemon(pokemonName).then((pokemon) => {
      setState({ pokemon, status: 'successful' });
    });
    return function cleanup() {
      setState({ status: 'idle', pokemon: null });
    };
    // only run if our pokemonName changes, this is the state we are synced with
  }, [pokemonName]);
  if (!pokemonName) return <h1>Please submit a pokemon</h1>;
  const { pokemon } = state;
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
