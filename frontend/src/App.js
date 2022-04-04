import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from "react-router-dom";
import Login from "./Component/Login/Login";
import Main from './Component/MainPage/mainpage';
import ProtectedRoute from './auth/protected-route';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/main" component={<Main />} />
    </Routes>
  );
}

export default App;
