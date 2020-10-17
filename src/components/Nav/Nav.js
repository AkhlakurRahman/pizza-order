import React from 'react';
import { Link } from 'gatsby';

export default function Nav() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Hot Now</Link>
          </li>
          <li>
            <Link to="/pizzas">Pizzas Menu</Link>
          </li>
          <li>
            <Link to="/">Logo</Link>
          </li>
          <li>
            <Link to="/slicemasters">SliceMasters</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
