import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';

import './app.css';
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from '../../services/dummy-swapi-service';
import {SwapiServiceProvider} from '../swapi-service-context';
import {PeoplePage} from '../pages';
import {PlanetsPage} from '../pages';
import {StarshipsPage} from '../pages';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    hasError: false,
    personId: 11,
    planetId: 5,
    starshipId: 5,
    swapiService: new SwapiService(),
  }

  componentDidCatch() {
     this.setState({hasError: true});
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  toggleDataClickHandler = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      }
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header
              toggleDataClickHandler={this.toggleDataClickHandler} />
            {planet}

            <div className="row mb2 button-row">
              <button
                className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toggleRandomPlanet}>
                Toggle Random Planet
              </button>
            </div>

            <PeoplePage />
            <PlanetsPage />
            <StarshipsPage />

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
