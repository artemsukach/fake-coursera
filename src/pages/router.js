import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { ROUTE_PATH } from '../../utils/constants';
import Layout from '../components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.list(),
    element: <Layout />,
    children: [],
  },
]);

export default router;
