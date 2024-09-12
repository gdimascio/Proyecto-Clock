import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import { store } from './store/store';
import { Provider, useSelector } from 'react-redux';
import './index.css';
import App from './App';
import RootLayout from './layouts/RootLayouts'
// import Home from './pages/Home'
import Profile from './pages/Profile'
import Clocks from './pages/Clocks'
import Calendar from './pages/Calendar';
import Projects from './pages/Projects';
import Error from './pages/Error'

const PrivateRoute = ({children}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  return isLoggedIn ? children : <Navigate to="/" />
}

const router = createBrowserRouter(
  createRoutesFromElements((
    <Route path='/' element={<RootLayout/>}>
      <Route path='/' element={<App/>}/>
      <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
      <Route path='/clocks' element={<PrivateRoute><Clocks/></PrivateRoute>}/>
      <Route path='/projects' element={<PrivateRoute><Projects/></PrivateRoute>}/>
      <Route path='/calendar' element={<PrivateRoute><Calendar/></PrivateRoute>}/>

      <Route path='/*' element={<Error/>}/>
    </Route>
  ))
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

