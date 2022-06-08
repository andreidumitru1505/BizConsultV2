import './App.css';

import Home from './components/Home';
import CheckEnrolledUser from './components/CheckEnrolledUser';
import ProfileSubmission from './components/ProfileSubmission';

//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function App() {

  return (
    <div className="App">
        <div className="content">
            <Routes>
                <Route exact path="/" element = {<CheckEnrolledUser/>}/>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/profileSubmission" element = {<ProfileSubmission/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;