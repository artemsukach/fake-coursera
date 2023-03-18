import React from 'react';

import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';

import { ROUTE_PATH } from '../../utils/constants';

import { apiCourses } from '../../api/services/courses';

import Layout from '../components/Layout/Layout';

import { getPathWithoutPage } from '../../helpers/getPathWithoutPage';

import CoursesPage from './CoursesPage/CoursesPage';
import ErrorPage from './ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/courses" />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTE_PATH.courses(),
        element: <CoursesPage />,
        loader: apiCourses.getCourses,
        shouldRevalidate: ({ currentUrl, nextUrl }) => {
          if (!currentUrl.pathname.includes('page')) return false; // if path don't exist page param

          const currentPath = getPathWithoutPage(currentUrl.pathname);
          const nextPath = getPathWithoutPage(nextUrl.pathname);

          return currentPath !== nextPath;
        },
      },
    ],
  },
]);

export default router;
