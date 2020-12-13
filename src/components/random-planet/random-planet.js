import React, {Component} from 'react';

import SwapiService from '../../services/swapi-service';
import Loader from '../loader';
import ErrorIndicator from "../error-indicator";

import {getRandomInteger} from '../../utils/common';


import './random-planet.css';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 4500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  planetLoadedHandler = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
    });
  };

  errorHandler = (error) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updatePlanet = () => {
    const id = getRandomInteger(1, 19);

    this.swapiService
      .getPlanet(id)
      .then(this.planetLoadedHandler)
      .catch(this.errorHandler);
  };

  render() {
    const {planet, loading, error} = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const loader = loading ? <Loader /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
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
