import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';

import SEO from '../components/SEO/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function OdersPage({ data }) {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });

  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO title="Order A Pizza" />
      <form>
        <fieldset>
          <legend>Your Info</legend>

          <label htmlFor="name">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={updateValue}
              id="name"
            />
          </label>

          <label htmlFor="email">
            <span>Email</span>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={updateValue}
              id="email"
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Menu</legend>

          {pizzas.map((pizza) => (
            <div key={pizza.id}>
              <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button type="button" key={size}>
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </fieldset>

        <fieldset>Order</fieldset>
      </form>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
