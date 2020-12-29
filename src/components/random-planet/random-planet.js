import React, {useMemo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import SwapiService from '../../services/swapi-service';
import Loader from '../loader';
import ErrorIndicator from "../error-indicator";

import {getRandomInteger} from '../../utils/common';

import './random-planet.css';
const swapiService = new SwapiService();

const RandomPlanet = (props) => {
  const initialState = useMemo(() => ({
    planet: null,
    loading: true,
    error: false,
  }), []);

  const [dataState, setDataState] = useState(initialState);

  const getPlanet = () => {
    const id = getRandomInteger(1, 19);

    swapiService
      .getPlanet(id)
      .then(planet => setDataState({
        planet,
        loading: false,
        error: false,
      }))
      .catch(error => setDataState({
        planet: null,
        loading: false,
        error: true,
      }));
  };

  useEffect(() => {
    setDataState(initialState);
    const {updateInterval = 3000} = props;

    getPlanet();

    const interval = setInterval(() => getPlanet(), updateInterval);

    return () => clearInterval(interval);
  }, [initialState, props]);

    const {planet, loading, error} = dataState;

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
};

RandomPlanet.propTypes = {
  updateInterval: PropTypes.number
};

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

export default RandomPlanet;
