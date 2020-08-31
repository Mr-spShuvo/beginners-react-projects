import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Pokemon from "./components/Pokemon";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonImg, setPokemonImg] = useState([]);

  const [loader, setLoader] = useState(true);

  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  useEffect(() => {
    setLoader(true);
    let cancel;
    const apiCall = async () => {
      const res = await axios.get(currentUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      const data = res.data.results;
      const next = res.data.next;
      const prev = res.data.previous;
      setPokemon(data.map((p) => p.name));
      setNextPage(next);
      setPrevPage(prev);
      generatePokemonImg(res.data.results);
      setLoader(false);
    };
    apiCall();
    return () => cancel();
  }, [currentUrl]);

  function generatePokemonImg(pokemon) {
    const data = pokemon.map((pokemon) => {
      const url = pokemon.url;
      const id = url
        ? url.split("https://pokeapi.co/api/v2/pokemon/")[1].split("/")[0]
        : "";
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    });
    setPokemonImg(data);
  }

  function goNextPage() {
    setCurrentUrl(nextPage);
  }

  function goPrevPage() {
    setCurrentUrl(prevPage);
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <a href="/">
            <h1 className="logo">
              <span role="img" aria-label="Logo">
                🐉 &nbsp;
              </span>
              React Pokémon
            </h1>
          </a>
          <p className="logo__sub">Browse through Pokémon!</p>
        </header>
        {loader ? (
          <Loader />
        ) : (
          <Pokemon dataName={pokemon} dataImg={pokemonImg} />
        )}
        <Pagination
          nextPage={nextPage ? goNextPage : () => {}}
          prevPage={prevPage ? goPrevPage : () => {}}
        />
      </div>
    </div>
  );
}

export default App;
