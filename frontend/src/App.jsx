import './App.css'
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import  Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Homepage from './components/homepage/Homepage';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* for each route, do what is on the line below */}
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App


