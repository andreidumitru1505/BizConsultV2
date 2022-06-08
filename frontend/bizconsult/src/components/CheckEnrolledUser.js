import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import Home from "./Home";
import {useNavigate } from "react-router-dom";
import ProfileSubmission from "./ProfileSubmission";

const CheckExistingProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [response, setResponse] = useState();

    const navigate = useNavigate();
    useEffect(() => {
        
        const checkEnrolled = async () => {
            const emailAddress = user.email;
            const dummy = 'dummy';

           const res = await fetch('http://localhost:8080/enrolledUserCheck',{
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({emailAddress, dummy})
           }).then(data => data.json())
           setResponse(res);
        }

        if(isAuthenticated){
            checkEnrolled();
        }
      })

 
    if(isLoading)
        return <div>Loading...</div>

    if(!isLoading && !isAuthenticated){
        navigate("/home", {state:{ firstName:'INVALID', lastName:'INVALID', emailAddress:'INVALID', role: 'INVALID' }});
        return <Home/>;
    }

    if (typeof response !== 'undefined'){
        if(!isAuthenticated){
            navigate("/home", {state:{ firstName:'INVALID', lastName:'INVALID', emailAddress:'INVALID', role: 'INVALID' }});
            return <Home/>;
        }
        else if (isAuthenticated && response.hasOwnProperty('message')){
            navigate("/profileSubmission")
            return <ProfileSubmission/>;
        }
        else {
            navigate("/home", {state:{ firstName: response.firstName, lastName:response.lastName, emailAddress:response.emailAddress, role:response.role}});
            return <Home/>;
        }
    }

};

export default CheckExistingProfile;