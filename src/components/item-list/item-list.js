import React from 'react';

import './item-list.css';

const ItemList = (props) => {
  const {data, itemSelectedHandler, children: renderLabel} = props;

  const items = data.map((item) => {
    const {id} = item;
    const label = renderLabel(item);

    return (
      <li className="list-group-item"
        key={id}
        onClick={() => itemSelectedHandler(id)}>
        {label}
      </li>
    );
  });

  ItemList.defaultProps = {
    itemSelectedHandler: () => {}
  }

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  )
};

export default ItemList;

