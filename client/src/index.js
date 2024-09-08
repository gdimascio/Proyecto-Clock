import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import RootLayout from './layouts/RootLayouts'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Clocks from './pages/Clocks';
import Calendar from './pages/Calendar';
import Projects from './pages/Projects';
import Error from './pages/Error'

const router = createBrowserRouter(
  createRoutesFromElements((
    <Route path='/' element={<RootLayout/>}>
      <Route path='/' element={<App/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/clocks' element={<Clocks/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/calendar' element={<Calendar/>}/>


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

