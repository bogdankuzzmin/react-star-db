import React, {Component} from 'react';
import {PersonList, PersonDetails} from '../sw-components';
import Row from "../row";

export default class PlanetsPage extends Component {
  state = {
    selectedItem: 1
  };

  itemSelectedHandler = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    const {selectedItem} = this.state;

    return (
      <Row
        left={<PersonList itemSelectedHandler={this.itemSelectedHandler} />}
        right={<PersonDetails itemId={selectedItem} />} />
    );
  }
}
