import {React, useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import Navbar from './Navbar';
import homeImage from '../images/home.png'

const Home = () => {
    const { isLoading } = useAuth0();
    const {state} = useLocation();

    if (isLoading) {
        return <div>Loading</div>;
    }
    return (
    <>
        
        <div>
            <Navbar firstName={state.firstName} lastName={state.lastName} emailAddress={state.emailAddress} role={state.role}/>
        </div>
            <div style={{maxWidth: "54px"}}>  </div>
        <div style ={{display: "flex", justifyContent:"center",alignItems: "center",marginTop:"50px"}}> 
            <div class="container">
            <img className="img" src={homeImage}  style ={{display: "block", display: "flex", justifyContent:"center", alignItems: "center", margin: " 0 auto", borderRadius: "20px"}} />
            </div>
           
            </div>   
        
    </>
    )
};

export default Home;