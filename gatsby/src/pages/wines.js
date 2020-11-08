import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO/SEO';

const WineGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  margin-top: 5rem;
`;

const SingleWineStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 1rem;
  }
`;

export default function wines({ data }) {
  console.log(data);
  return (
    <>
      <SEO title={`Wines! We Have - ${data.wines.nodes.length} in Stock`} />
      <h2 className="center">
        We have {data.wines.nodes.length} wines available. Dine only!
      </h2>
      <WineGridStyles>
        {data.wines.nodes.map((wine) => {
          const rating = Math.round(wine.rating.average);
          return (
            <SingleWineStyles key={wine.id}>
              <img src={wine.image} alt={wine.winery} />
              <h3>{wine.winery}</h3>
              <p title={`${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐`.repeat(5 - rating)}
                </span>
                <span>({wine.rating.reviews.split(' ')[0]})</span>
              </p>
            </SingleWineStyles>
          );
        })}
      </WineGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    wines: allWine {
      nodes {
        id
        image
        location
        wine
        winery
        rating {
          average
          reviews
        }
      }
    }
  }
`;
