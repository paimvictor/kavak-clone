import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../services/auth";

import Login from "./login.component";
import Register from "./register.component";
import Home from "./home.component";
import { EditCars } from "./EditCars";
import { CarList } from "./CarList";
import { SellForm } from "./SellForm";

export const NavBar: React.FC<{}> = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (!(Object.keys(user).length === 0)) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser('');
    setShowAdminBoard(false);
  }


  return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Kavak
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/comprar"} className="nav-link">
                Comprar Carro
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/vender"} className="nav-link">
                Vender Carro
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/editar"} className="nav-link">
                  Administração
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Cadastre-se
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comprar" element={<CarList />} />
            <Route path="/vender" element={<SellForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/editar" element={<EditCars />} />
          </Routes>
        </div>
      </div>
  );
}
