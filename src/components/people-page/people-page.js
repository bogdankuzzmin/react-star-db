import React, {Component} from 'react';

import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';

import './people-page.css';

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

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
        getData={this.swapiService.getAllPeople}>
        
        {(i) => (
          `${i.name} (${i.birthYear})`
        )}
      </ItemList>
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );

    return (
      <Row 
        left={itemList}
        right={personDetails} />
    );
  }
}