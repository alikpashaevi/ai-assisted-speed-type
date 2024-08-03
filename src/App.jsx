import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainPage from './pages/MainPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainPage />} />
  )
)

const App = () => {
    return (
      <RouterProvider router={router} />
    );
  };

export default App;
