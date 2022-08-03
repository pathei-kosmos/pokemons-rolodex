import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import GitCorner from "./components/git-corner/git-corner.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      pokemons: [],
      searchField: "",
    };
  }

  componentDidMount() {
    const randomOffset = Math.floor(Math.random() * (139 - 1 + 1)) + 1;
    // fetch the pokemon API (returns only the names and URLs)
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${randomOffset}`)
      .then((res) => res.json())
      .then((pokemonsList) => {
        // update the state
        this.setState(
          () => {
            // put the received object in an array to map it
            pokemonsList = [].concat(pokemonsList.results);
            return { pokemons: pokemonsList };
          },
          () => {
            // creates a deep clone object of the state
            const clone = JSON.parse(JSON.stringify(this.state.pokemons));
            // create a promise on the forEach to trigger the setState once it is finished
            const promisedSprites = new Promise((resolve, reject) => {
              // fetch each URL of the clone and add the sprite and ID as properties
              clone.forEach((pokemon, index, array) => {
                console.log("FETCH");
                fetch(pokemon.url)
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    pokemon.id = data.id;
                    pokemon.sprite =
                      data.sprites.other["official-artwork"].front_default ||
                      data.sprites.other["dream_world"].front_default ||
                      data.sprites.other.home.front_default;
                    // resolves the promise once the forEach is completed
                    if (index === array.length - 1) resolve();
                  })
                  .catch((err) => console.log(err));
              });
            });

            // update the state with the enriched clone once the forEach is finished
            promisedSprites.then(() => {
              this.setState(() => {
                return { pokemons: clone };
              });
            });
          }
        );
      })
      .catch((err) => console.log(err));
  }

  onSearchChange = (event) => {
    let searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { pokemons, searchField } = this.state;
    const { onSearchChange } = this;

    let filteredPokemons = pokemons.filter((pokemon) => {
      return pokemon.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <GitCorner />
        <h1>
          Pokemons Rolodex
          <img
            alt="pokeball"
            className="title-image"
            src="./pokeball.png"
          ></img>
        </h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="Search pokemons..."
          className="pokemons-search-box"
        />
        <CardList pokemons={filteredPokemons} />
      </div>
    );
  }
}

export default App;
