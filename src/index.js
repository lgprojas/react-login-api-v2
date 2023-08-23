import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login  from './routes/Login';
import Signup  from './routes/Signup';
import Dashboard  from './routes/Dashboard';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';//nuevo

const root = ReactDOM.createRoot(document.getElementById('root'));

//nuevo
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
