import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TimesUpPage from './pages/TimesUpPage'; // Import the new page
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainPage />} />
      <Route path = '/login' element={<LoginPage />} />
      <Route path = '/register' element={<SignupPage />} />
      <Route path = '/profile' element={<ProfilePage />} />
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
