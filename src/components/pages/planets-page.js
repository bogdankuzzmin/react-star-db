import React, {Component} from 'react';
import {PlanetList, PlanetDetails} from '../sw-components';
import Row from "../row";

export default class PlanetsPage extends Component {
  state = {
    selectedItem: 4
  };

  itemSelectedHandler = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    const {selectedItem} = this.state;

    return (
      <Row
        left={<PlanetList itemSelectedHandler={this.itemSelectedHandler} />}
        right={<PlanetDetails itemId={selectedItem} />} />
    );
  }
}
