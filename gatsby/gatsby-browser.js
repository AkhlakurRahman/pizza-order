import React from 'react';
import Layout from './src/components/Layout/Layout';
import { OrderProvider } from './src/components/OrderContext/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
