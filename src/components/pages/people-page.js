import React from 'react';
import {withRouter} from 'react-router-dom';
import {PersonList, PersonDetails} from '../sw-components';
import Row from "../row";

const PlanetsPage = ({match, history}) => {
    return (
      <Row
        left={<PersonList itemSelectedHandler={(id) => history.push(id)} />}
        right={<PersonDetails itemId={match.params.id} />} />
    );
};

export default withRouter(PlanetsPage);
