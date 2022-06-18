import {React, useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import Navbar from './Navbar';
import logo from '../images/BizConsult-logo.png'
import background from '../images/Background-collage.png'
import * as constants from '../constants';


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
        <div class="h-screen pb-14 bg-right bg-cover bg-opacity-0" style={{ backgroundImage: `url(${background})`}}>
            <div class="w-full container mx-auto ">
                <div class="w-full flex items-center justify-between">
                    <div class="flex w-1/2 content-center">		
                        <div class="text-indigo-500 md:order-1">
                            <img className="img h-80 w-80 mb-0" src={logo}/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                    <h1 class="my-4 text-3xl md:text-5xl text-purple-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">Business counseling tailored for your needs</h1>
                    <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">At BizConsult, we make it our purpose to help your company succeed through our continously improving business idea generator and rich partner community.</p>
                    { state.role !== constants.EXPERT_ADMIN_ROLE &&
                        state.role !== constants.ENTREPRENEUR_ROLE &&
                        state. role !== constants.SYS_ADMIN_ROLE && 
                    <p class="text-indigo-500 font-bold pt-10 pb-8 lg:pb-6 text-center md:text-left fade-in">Want to join in on the fun? Create your account today and start building your future unicorn!</p>
                    }
                </div>
                <div class="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
                    <a class="text-gray-500 no-underline hover:no-underline" href="#">&copy; BizConsult 2022</a>
                </div>
            </div>
        </div> 
    </>
    )
};

export default Home;