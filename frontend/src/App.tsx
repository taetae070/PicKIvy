import WelcomePage from '@pages/WelcomePage';
import HousePage from '@pages/HousePage';
import SignUp from '@pages/JoinPage';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/house" element={<HousePage />} />
          <Route path="/sign-up" element={<SignUp />} /> 
        </Routes>
    </Router>
        
  );
}


export default App;
