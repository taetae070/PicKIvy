import React from 'react';
import WelcomePage from './pages/WelcomePage';
import HousePage from './pages/HousePage';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/house" element={<HousePage />} />
        </Routes>
    </Router>
        
  );
}


export default App;
