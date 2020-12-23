import React from 'react';
import {withRouter} from 'react-router-dom';
import {StarshipList} from '../sw-components';

const StarshipsPage = ({history}) => {
    return (
      <StarshipList
        itemSelectedHandler={(itemId) => {
          history.push(`/starships/${itemId}`);
        }} />
    );
}

export default withRouter(StarshipsPage);
