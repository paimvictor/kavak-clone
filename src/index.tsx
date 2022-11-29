import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { CarList } from "./components/CarList";
import { SellForm } from "./components/SellForm";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "venda-seu-carro/",
        element: <SellForm />,
      },
      {
        path: "comprar-um-carro/",
        element: <CarList />,
      }
    ]
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
