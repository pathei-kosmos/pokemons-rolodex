import { Component } from "react";
import Card from "../card/card.component";
import "./card-list.styles.css";

class CardList extends Component {
  render() {
    const { pokemons } = this.props;
    return (
      <div className="card-list">
        {pokemons.map((pokemon) => (
          <Card pokemon={pokemon} />
        ))}
      </div>
    );
  }
}

export default CardList;
