import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  fieldset {
    grid-column: span 2;
    max-height: 60rem;
    overflow: auto;
    display: grid;
    gap: 1rem;
    align-content: start;

    &.menu,
    &.order {
      grid-column: span 1;
    }
  }

  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }
`;

export default OrderStyles;
