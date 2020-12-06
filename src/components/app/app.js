import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';

import './app.css';
import ItemDetails, {Record} from "../item-details/item-details";
import Row from '../row';
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
     this.setState({hasError: true});
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}>

        <Record field="birthYear" label="Birth Year" />
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails = (
        <ItemDetails
          itemId={9}
          getData={getStarship}
          getImageUrl={getStarshipImage}>

          <Record field="model" label="Model" />
          <Record field="length" label="Length" />
          <Record field="passengers" label="Passengers" />
        </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          {planet}

          <div className="row mb2 button-row">
            <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
            </button>
          </div>

          <Row left={personDetails} right={starshipDetails} />

          {/*<PeoplePage />*/}
        </div>
      </ErrorBoundry>
    );
  }
}
