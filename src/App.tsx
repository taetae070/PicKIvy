import React, { useState } from 'react';
// import WelcomePage from './pages/WelcomePage';
import WelcomePage from '@pages/WelcomePage';
import HousePage from './pages/HousePage';
import LoginModal from './components/LoginJoin/LoginModal';
import LoginBtn from './components/LoginJoin/LoginBtn';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

function App() {
  const [isModalOpen, setIsModalOpen] = useState (false);

  const handleModalClose = ()=>{
    setIsModalOpen(false);
  }

  const handleModalOpen = ()=>{
    setIsModalOpen(true);
  }

  return (
    <Router>
      <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/house" element={<HousePage />} />
          <Route path="/loginPage" element={<LoginModal onClose={handleCloseClick}/>} />
        </Routes>
    </Router>
        
  );
}


export default App;
