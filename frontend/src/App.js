import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login/Login";
import Main from './Component/MainPage/mainpage';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="" element={<Login />} />
        <Route path="main" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default App;
