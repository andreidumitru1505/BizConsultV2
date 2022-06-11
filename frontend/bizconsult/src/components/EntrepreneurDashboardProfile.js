import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const EntrepreneurDashboardProfile = () => {
    const {state} = useLocation();

    const [ideas, setIdeas] = useState();
    const [isLoading, setIsLoading] = useState(1);
    const emailAddress = state.emailAddress;
    const dummy = 'dummyIndustry';
    const navigate = useNavigate();

    useEffect(() => {
        console.log(state);
        fetch('http://localhost:8080/getEntrepreneurIdeas',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailAddress, dummy})
        })
            .then(response => response.json())
            .then(data => {setIdeas(data);console.log(data); setIsLoading(0)})

    }, []);


    if(isLoading){
        return <div>Loading...</div>
    }
    else{

    return (
        <div>
            <div>
                <Navbar firstName={state.firstName} lastName={state.lastName} emailAddress={state.emailAddress} role={state.role}/>
            </div>
            <div class="flex bg-gray-100 rounded-xl m-3 shadow-xl">
                <aside class="flex px-16 space-y-16 overflow-hidden m-3 pb-4 flex-col items-center justify-center rounded-tl-xl rounded-bl-xl bg-blue-800 shadow-lg">
                    <div class="flex items-center justify-center p-4 shadow-lg">
                    <div>
                        <img src="https://i.imgur.com/c6U7KtF.png" alt="" class="h-8 mb-2" />
                    </div>
                    <h1 class="text-white font-bold mr-2 cursor-pointer">BizConsult</h1>
                    </div>
                    <ul>
                    <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <button  onClick={() => navigate("/entrepreneurDashboard",
                                        {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role}})}>
                                        Dashboard
                        </button>
                    </li>
                    <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                        <button  onClick={() => navigate("/entrepreneurIdeas",
                                        {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role}})}>
                                        Ideas
                        </button>
                    </li>
                    <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                        <button  onClick={() => navigate("/entrepreneurProfile",
                                        {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role}})}>
                                        Profile
                        </button>
                    </li>
                    <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg
                        ><a href="">Coaches</a>
                    </li>
                    <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg
                        ><a href="">Exercise Plan</a>
                    </li>
                    <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg
                        ><a href="">Registrations</a>
                    </li>
                    <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg
                        ><a href="">Settings</a>
                    </li>
                    </ul>
                </aside>
                <main class="flex-col bg-indigo-50 w-full ml-4 pr-6">
                    <div class="flex p-4 bg-white items-center mt-3 rounded-xl shadow-lg">
                        <h1 class="text-4xl font-bold text-gray-700">Check out your awesome profile, {state.firstName}</h1>
                    </div>
                    <div class="justify-between w-full mx-auto rounded-xl mt-4 p-4 bg-white shadow-lg">
                        <div class="bg-gray-100 py-16 px-10 ">
                            <div class="bg-white p-10 md:w-3/4 lg:w-1/2 mx-auto">

                                <form action="">

                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-20 mr-6 text-right 
                                                                font-bold text-gray-600">Text</label>
                                        <p class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">Mirel</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="number" class="inline-block w-20 mr-6 text-right 
                                                                font-bold text-gray-600">Number</label>
                                        <input type="number" id="number" name="number" placeholder="number" 
                                            class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none"/>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="number" class="inline-block w-20 mr-6 text-right 
                                                                font-bold text-gray-600">Range</label>
                                        <input type="range" id="range" name="range" placeholder="range" 
                                            class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none"/>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="number" class="inline-block w-20 mr-6 text-right 
                                                                font-bold text-gray-600">File</label>
                                        <input type="file" id="file" name="file" placeholder="file" 
                                            class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none"/>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="number" class="inline-block w-20 mr-6 text-right 
                                                                font-bold text-gray-600">Date</label>
                                        <input type="date" id="date" name="date" placeholder="date" 
                                            class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none"/>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="number" class="inline-block w-20 mr-6 text-right 
                                                                font-bold text-gray-600">Month</label>
                                        <input type="month" id="month" name="month" placeholder="month" 
                                            class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none"/>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="number" class="inline-block w-20 mr-6 text-right 
                                                                font-bold text-gray-600">Time</label>
                                        <input type="time" id="time" name="time" placeholder="time" 
                                            class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none"/>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="number" class="inline-block w-20 mr-6 text-right 
                                                                font-bold text-gray-600">Password</label>
                                        <input type="password" id="password" name="password" placeholder="password" 
                                            class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none"/>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="number" class="inline-block w-20 mr-6 text-right 
                                                                font-bold text-gray-600">Select</label>
                                        <select class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">
                                            <option>Surabaya</option>
                                            <option>Jakarta</option>
                                            <option>bandung</option>
                                            <option>Tangerang</option>
                                        </select>
                                    </div>
                                    <div class="text-right">
                                        <button class="py-3 px-8 bg-green-400 text-white font-bold">Submit</button> 
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>          
        </div>
        )
    }
}


export default EntrepreneurDashboardProfile;