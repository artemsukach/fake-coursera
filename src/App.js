import React from 'react';
import { RouterProvider } from 'react-router-dom';

import Spinner from './components/Spinner/Spinner';

import router from './pages/router';

const App = () => (
  <RouterProvider router={router} fallbackElement={<Spinner />} />
);

export default App;
