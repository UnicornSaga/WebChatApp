import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.scss';
import App from './App';
import Login from "./Component/Login/Login";

const routs = (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path="" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

ReactDOM.render(
  routs,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
