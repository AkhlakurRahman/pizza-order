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

async function turnSliceMastersIntoPages({ graphql, actions }) {
  const singleSliceMasterTemplate = path.resolve(
    './src/templates/SingleSliceMaster.js'
  );

  const { data } = await graphql(`
    query {
      sliceMasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.sliceMasters.nodes.forEach((sliceMaster) => {
    actions.createPage({
      path: `/slicemaster/${sliceMaster.slug.current}`,
      component: singleSliceMasterTemplate,
      context: {
        slug: sliceMaster.slug.current,
      },
    });
  });

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.sliceMasters.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);

    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
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
    turnSliceMastersIntoPages(params),
  ]);
}
