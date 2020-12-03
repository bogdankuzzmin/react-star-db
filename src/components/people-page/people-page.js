import React, {Component} from 'react';

import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';

import './people-page.css';

export default class PeoplePage extends Component {
  SwapiService = new SwapiService();

  state = {
    selectedPerson: 3,
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({hasError: true});
  }

  personSelectedHandler = (selectedPerson) => {
    this.setState({selectedPerson});
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const itemList = (
      <ItemList
        itemSelectedHandler={this.personSelectedHandler}
        getData={this.SwapiService.getAllPeople}>

        {(i) => (
          `${i.name} (${i.birthYear})`
        )}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={personDetails} />
    );
  }
}
