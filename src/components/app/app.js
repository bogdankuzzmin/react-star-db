import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import {PeoplePage, PlanetsPage, StarshipsPage} from '../pages';

import ErrorBoundry from "../error-boundry";
import ErrorIndicator from '../error-indicator';

import SwapiService from "../../services/swapi-service";
import DummySwapiService from '../../services/dummy-swapi-service';
import {SwapiServiceProvider} from '../swapi-service-context';

import './app.css';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    hasError: false,
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

    const planet = this.state.showRandomPlanet ? <RandomPlanet updateInterval={5000} /> : null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header toggleDataClickHandler={this.toggleDataClickHandler} />

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
