import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Component/Login/Login";
import Main from './Component/MainPage/mainpage';
import Settings from './Component/Settings/Settings';
import { PacmanLoader } from 'react-spinners';
import { useAuth0 } from '@auth0/auth0-react';

function App() {

  const override = `
  display: block;
  margin: auto auto;
  border-color: red;
  `;

  const { isLoading } = useAuth0();

  if (isLoading) {
    return <PacmanLoader 
              color={'#36D7B7'} isLoading={isLoading}
              css={override} size={150} 
            />
  }

  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/main" element={
        <RequireAuth redirectTo="/">
          <Main />
        </RequireAuth>
      } />
      <Route path="/settings" element={
        <RequireAuth redirectTo="/">
          <Settings />
        </RequireAuth>
      } />
    </Routes>
  );
}

function RequireAuth({ children, redirectTo }) {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

export default App;
