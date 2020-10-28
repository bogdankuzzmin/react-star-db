import React, {Component} from 'react';
import {getRandomInteger} from '../../utils/common';

import SwapiService from '../../services/swapi-service';
import Loader from '../loader';

import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  planetLoadedHandler = (planet) => {
    this.setState({
      planet,
      loading: false,
    });
  };

  errorHandler = (error) => {

  };

  updatePlanet() {
    const id = getRandomInteger(1, 19);
    
    this.swapiService
      .getPlanet(id)
      .then(this.planetLoadedHandler)
      .catch(this.errorHandler);
  }

  render() {
    const {planet, loading} = this.state;

    const loader = loading ? <Loader /> : null;
    const content = !loading ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {loader}
        {content}
      </div>
    );
  }
}

const PlanetView = ({planet}) => {
  const {id, name, population,
    rotationPeriod, diameter} = planet;

  return (
    <React.Fragment>
       <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
             alt="planet" />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  );
};
