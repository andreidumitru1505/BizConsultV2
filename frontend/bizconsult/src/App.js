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
import ExpertDashboardOpenApplications from './components/ExpertDashboardOpenApplications';
import ExpertDashboardUnderReviewApplications from './components/ExpertDashboardUnderReviewApplications';
import ExpertDashboardReviewApplication from './components/ExpertDashboardReviewApplication';
import ExpertDashboardAcceptedApplications from './components/ExpertDashboardAcceptedApplications';
import ExpertDashboardRejectedApplications from './components/ExpertDashboardRejectedApplications';
import CompanyDashboard from './components/CompanyDashboard';
import CompanyCollaborationsDashboard from './components/CompanyCollaborationsDashboard';
import CompanyCollaborationInfoDashboard from './components/CompanyCollaborationInfoDashboard';
import CompanyPartnerSearchDashboard from './components/CompanyPartnerSearchDashboard';

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
                <Route exact path="/expertDashboardOpenApplications" element = {<ExpertDashboardOpenApplications/>}/>
                <Route exact path="/expertDashboardUnderReviewApplications" element = {<ExpertDashboardUnderReviewApplications/>}/>
                <Route exact path="/reviewApplication" element = {<ExpertDashboardReviewApplication/>}/>
                <Route exact path="/expertDashboardAcceptedApplications" element = {<ExpertDashboardAcceptedApplications/>}/>
                <Route exact path="/expertDashboardRejectedApplications" element = {<ExpertDashboardRejectedApplications/>}/>
                <Route exact path="/companyDashboard" element = {<CompanyDashboard/>}/>
                <Route exact path="/collaborations" element = {<CompanyCollaborationsDashboard/>}/>
                <Route exact path="/collaborationInfo" element = {<CompanyCollaborationInfoDashboard/>}/>
                <Route exact path="/partnerSearch" element = {<CompanyPartnerSearchDashboard/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;