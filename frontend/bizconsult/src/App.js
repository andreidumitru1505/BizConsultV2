import './App.css';

import Home from './components/Home';
import CheckEnrolledUser from './components/CheckEnrolledUser';
import ProfileSubmission from './components/ProfileSubmission';
import IndustryRecommendation from './components/IndustryRecommendation';
import EntrepreneurDashboard from './components/EntrepreneurDashboard';


//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import EntrepreneurDashboardIdeas from './components/entrepreneurDashboardIdeas';
import EntrepreneurDashboardProfile from './components/EntrepreneurDashboardProfile';
import EntrepreneurDashboardRegisterCompany from './components/EntrepreneurDashboardRegisterCompany';
import ExpertDashboard from './components/ExpertDashboard';

function App() {

  return (
    <div className="App">
        <div className="content">
            <Routes>
                <Route exact path="/" element = {<CheckEnrolledUser/>}/>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/profileSubmission" element = {<ProfileSubmission/>}/>
                <Route exact path="/industryRecommendation" element = {<IndustryRecommendation/>}/>
                <Route exact path="/entrepreneurDashboard" element = {<EntrepreneurDashboard/>}/>
                <Route exact path="/entrepreneurIdeas" element = {<EntrepreneurDashboardIdeas/>}/>
                <Route exact path="/entrepreneurProfile" element = {<EntrepreneurDashboardProfile/>}/>
                <Route exact path="/registerCompany" element = {<EntrepreneurDashboardRegisterCompany/>}/>
                <Route exact path="/expertDashboard" element = {<ExpertDashboard/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;