import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import RootLayout from './layouts/RootLayouts'
import Profile from './pages/Profile'
import Error from './pages/Error'

const router = createBrowserRouter(
  createRoutesFromElements((
    <Route path='/' element={<RootLayout/>}>
      <Route path='/' element={<App/>}/>
      <Route path='/profile' element={<Profile/>}/>
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

