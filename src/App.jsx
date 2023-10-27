


import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Radar from './Components/Radar';
import SingleNews from './Pages/singleNews';
import Login from './Components/Login';

function App({ newsData }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check local storage on page load
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');

    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]); // Only run this effect when the path changes

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/radar" element={<Radar />}></Route>
        <Route path="/news/:title" render={(props) => <SingleNews {...props} newsData={newsData} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
