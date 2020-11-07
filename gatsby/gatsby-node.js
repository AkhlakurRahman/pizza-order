import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzaIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/SinglePizza.js');

  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const res = await fetch('https://sampleapis.com/wines/api/reds');
  const wines = await res.json();

  wines.forEach((wine) => {
    const nodeMeta = {
      id: createNodeId(`wine-${wine.winery}`),
      parent: null,
      children: [],
      internal: {
        type: 'Wine',
        mediaType: 'application/json',
        contentDigest: createContentDigest(wine),
      },
    };

    actions.createNode({
      ...wine,
      ...nodeMeta,
    });
  });
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  await Promise.all([
    turnPizzaIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
}
