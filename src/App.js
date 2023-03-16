import React from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './pages/router';

const App = () => <RouterProvider router={router} fallbackElement={<div>loading...</div>}/>;

export default App;
