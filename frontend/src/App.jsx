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
import Account from './components/account/Account';
import Features from './components/features/Features';
import Journal from './components/features/Journal';
import { useState } from 'react';



function App() {
  const [sessionUsername, setSessionUsername] = useState("");
  const [sessionFamilyId, setSessionFamilyId] = useState("");
  const [sessionAccountType, setsessionAccountType] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        {/* for each route, do what is on the line below */}
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/login" element={<Login sessionUsername={sessionUsername} setSessionUsername={setSessionUsername} sessionFamilyId={sessionFamilyId} setSessionFamilyId={setSessionFamilyId}/>}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/account" element={<Account sessionUsername={sessionUsername} sessionAccountType={sessionAccountType} setsessionAccountType={setsessionAccountType}/>}></Route>
        <Route exact path="/features" element={<Features />}></Route>
        <Route exact path="/journal" element={<Journal sessionUsername={sessionUsername} sessionFamilyId={sessionFamilyId} setSessionFamilyId={setSessionFamilyId}
        sessionAccountType={sessionAccountType} setsessionAccountType={setsessionAccountType}/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App


