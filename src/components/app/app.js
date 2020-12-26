import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import {LoginPage, PeoplePage, PlanetsPage, SecretPage, StarshipsPage} from '../pages';
import StarshipDetails from '../sw-components/starship-details';

import ErrorBoundry from "../error-boundry";
import ErrorIndicator from '../error-indicator';

import SwapiService from "../../services/swapi-service";
import DummySwapiService from '../../services/dummy-swapi-service';
import {SwapiServiceProvider} from '../swapi-service-context';

import './app.css';
import Message from "../message";

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false,
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

  loginHandler = () => {
    this.setState({
      isLoggedIn: true
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
    const {isLoggedIn} = this.state;

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet updateInterval={5000} /> : null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
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

              <Switch>
                <Route path="/" render={() => <h2>Welcome to Start DB</h2>} exact />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetsPage} />
                <Route path="/starships" component={StarshipsPage} exact />
                <Route path="/starships/:id"
                       render={({match}) => {
                         const {id} = match.params;

                         return <StarshipDetails itemId={id} />
                       }} />
                <Route path="/secret"
                       render={() => {
                         return <SecretPage
                           isLoggedIn={isLoggedIn} />;
                       }} />
                <Route path="/login"
                       render={() => {
                         return <LoginPage
                           isLoggedIn={isLoggedIn}
                           loginHandler={this.loginHandler} />;
                       }} />

               <Route render={() => <Message message="This page was not found." />} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
