import WelcomePage from './pages/WelcomePage';
import HousePage from 'src/pages/HousePage';
import JoinPage from 'src/pages/JoinPage';
import LoginPage from 'src/pages/LoginPage';
// import WelcomePage from '@pages/WelcomePage';
// import HousePage from '@pages/HousePage/index';
// import SignUp from '@pages/JoinPage/index';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/house" element={<HousePage />} />
          <Route path="/join" element={<JoinPage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
        </Routes>
    </Router>
        
  );
}


export default App;
