import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from '../Logo/Logo';

const NavStyles = styled.nav`
  margin-bottom: 3rem;

  .logo {
    transform: translateY(-25%);
  }

  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;

    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
    margin-top: -6rem;
  }

  li {
    order: 1;
  }

  a {
    font-size: 3rem;
    text-decoration: none;

    &:hover {
      background: var(--red);
    }
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizzas Menu</Link>
        </li>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
