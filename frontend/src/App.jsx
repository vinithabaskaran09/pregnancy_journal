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
import Picture from './components/features/Picture';
import HealthInfo from './components/features/HealthInfo';
import { useState } from 'react';

import './scss/styles.css'

function App() {
  const [sessionUsername, setSessionUsername] = useState("");
  const [sessionFamilyId, setSessionFamilyId] = useState("");
  const [sessionAccountType, setsessionAccountType] = useState("");
  const [sessionHealthInfo, setSessionHealthInfo] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        {/* for each route, do what is on the line below */}
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/login" element={<Login sessionUsername={sessionUsername} setSessionUsername={setSessionUsername} sessionFamilyId={sessionFamilyId} setSessionFamilyId={setSessionFamilyId}/>}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/account" element={<Account sessionUsername={sessionUsername} sessionAccountType={sessionAccountType} setsessionAccountType={setsessionAccountType} sessionFamilyId={sessionFamilyId} setSessionFamilyId={setSessionFamilyId} setSessionHealthInfo={setSessionHealthInfo}/>}></Route>
        <Route exact path="/features" element={<Features sessionHealthInfo={sessionHealthInfo}/>}></Route>
        <Route exact path="/journal" element={<Journal sessionUsername={sessionUsername} sessionFamilyId={sessionFamilyId} setSessionFamilyId={setSessionFamilyId}
        sessionAccountType={sessionAccountType} setsessionAccountType={setsessionAccountType}/>}></Route>
        <Route exact path="/picture" element={<Picture />}></Route>
        <Route exact path="/healthInfo" element={<HealthInfo sessionFamilyId={sessionFamilyId} setSessionFamilyId={setSessionFamilyId} sessionAccountType={sessionAccountType} setsessionAccountType={setsessionAccountType} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App


