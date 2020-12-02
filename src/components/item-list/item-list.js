
import React, {Component} from 'react';

import SwapiService from '../../services/swapi-service';
import Loader from '../loader';

import './item-list.css';

export default class ItemList extends Component {
  swapiService = new SwapiService();

  state = {
    itemList: null
  };

  componentDidMount() {
    const {getData} = this.props;

      getData()
      .then((itemList) => {
        this.setState({
          itemList
        });
      })
  }

  renderItems(arr) {
    return arr.map((item) => {
      const {id} = item;

      const label = this.props.children(item);
      console.log(label);
      return (
        <li className="list-group-item"
          key={id}
          onClick={() => this.props.itemSelectedHandler(id)}>
          {label}
        </li>
      );
    });
  }

  render() {
    const {itemList} = this.state;

    if (!itemList) {
      return <Loader />
    }

    const items = this.renderItems(itemList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
