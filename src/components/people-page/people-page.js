import React, {Component} from 'react';

import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';

import './people-page.css';

export default class PeoplePage extends Component {
  state = {
    selectedPerson: 3,
    hasError: false, 
  };

  componentDidCatch() {
    this.setState({hasError: true});
  }

  personSelectedHandler = (id) => {
    this.setState({
      selectedPerson: id
    });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <div className="row mb2">
        <div div className="col-md-6">
          <ItemList itemSelectedHandler={this.personSelectedHandler}/>
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson} />
        </div>
      </div>
    );
  }
}