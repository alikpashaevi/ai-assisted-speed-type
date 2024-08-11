import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TimesUpPage from './pages/TimesUpPage'; // Import the new page

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainPage />} />
      <Route path='/timesup' element={<TimesUpPage />} /> {/* Add this route */}
    </>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
