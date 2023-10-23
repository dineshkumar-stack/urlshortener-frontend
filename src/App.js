import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Passwordreset from './Components/Passwordreset';
import Nopage from './Components/Nopage';
import Emailverify from './Components/Emailverify';
import URLShortener from './Components/URLPages/URLShortener';
import CreatedURLs from './Components/URLPages/CreatedURLs';
import Dashboard from './Components/URLPages/Dashboard';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword/emailverify" element={<Emailverify />} />
        <Route path="/passwordreset/:rtoken/:email" element={<Passwordreset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/urlshortener" element={<URLShortener />} />
        <Route path="*" element={<Nopage />} />
        <Route path="/allurls" element={<CreatedURLs />} />
      </Routes>

    </div>
  );
}

export default App;
