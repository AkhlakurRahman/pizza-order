import React from 'react';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Pagination from '../components/Pagination/Pagination';

const SliceMastersStyles = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SingleSliceMasterStyle = styled.div`
  a {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }

  h2 {
    transform: rotate(2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    z-index: 2;
    position: relative;
  }

  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    z-index: 2;
    text-align: center;
    transform: rotate(-1deg);
  }
`;

export default function SliceMasterPage({ data, pageContext }) {
  const sliceMasters = data.sliceMasters.nodes;
  console.log(pageContext);
  return (
    <>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.sliceMasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SliceMastersStyles>
        {sliceMasters.map((person) => (
          <SingleSliceMasterStyle key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>

            <Img fluid={person.image.asset.fluid} />

            <p className="description">{person.description}</p>
          </SingleSliceMasterStyle>
        ))}
      </SliceMastersStyles>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 4) {
    sliceMasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
