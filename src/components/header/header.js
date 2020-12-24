import React from 'react';
import {Link} from 'react-router-dom';

import './header.css';

const Header = ({toggleDataClickHandler}) => {
  return (
    <div className="header d-flex">
      <h3>
        <Link to="/">
          StarDB
        </Link>
      </h3>
      <ul className="d-flex">
        <li>
          <Link to="/people/">People</Link>
        </li>
        <li>
          <Link to="/planets/">Planets</Link>
        </li>
        <li>
          <Link to="/starships/">Starships</Link>
        </li>
        <li>
          <button onClick={toggleDataClickHandler}>Toggle data</button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
