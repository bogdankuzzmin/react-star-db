import React, {Component} from 'react';
import {StarshipList, StarshipDetails} from '../sw-components';
import Row from "../row";

export default class StarshipsPage extends Component {
  state = {
    selectedItem: 5
  };

  itemSelectedHandler = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    const {selectedItem} = this.state;

    return (
      <Row
        left={<StarshipList itemSelectedHandler={this.itemSelectedHandler} />}
        right={<StarshipDetails itemId={selectedItem} />} />
    );
  }
}
