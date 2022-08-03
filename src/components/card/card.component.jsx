import { Component } from "react";
import "./card.styles.css";

class Card extends Component {
  render() {
    const { pokemon } = this.props;

    return (
      <div className="card-container" key={pokemon.id}>
        <img
          className="card-image"
          alt={`pokemon ${pokemon.name}`}
          src={pokemon.sprite}
        ></img>
        <h2>{pokemon.name}</h2>
      </div>
    );
  }
}

export default Card;
