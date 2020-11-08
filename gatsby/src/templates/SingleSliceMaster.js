import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO/SEO';

export default function SingleSliceMaster({ data }) {
  const { sliceMaster } = data;

  return (
    <>
      <SEO title={sliceMaster.name} image={sliceMaster.image.asset.src} />
      <div className="center">
        <Img fluid={sliceMaster.image.asset.fluid} alt={sliceMaster.name} />

        <h2>
          <span className="mark">{sliceMaster.name}</span>
        </h2>
        <p className="description">{sliceMaster.description}</p>
      </div>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    sliceMaster: sanityPerson(slug: { current: { eq: $slug } }) {
      description
      id
      name
      slug {
        current
      }
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
