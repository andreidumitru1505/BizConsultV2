import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const EntrepreneurDashboard = () => {
    const {state} = useLocation();

    const [entrepreneurInfo, setEntrepreneurInfo] = useState();
    const [isLoading, setIsLoading] = useState(1);
    const emailAddress = state.emailAddress;
    const dummy = 'dummyIndustry';
    const navigate = useNavigate();

    useEffect(() => {
        console.log(state);
        fetch('http://localhost:8080/getDashboardInfo',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailAddress, dummy})
        })
            .then(response => response.json())
            .then(data => {setEntrepreneurInfo(data[0]);setIsLoading(0)})

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
            <div class="h-screen">
                <div class="flex h-5/6 bg-gray-100 rounded-xl m-3 mt-12 shadow-xl">
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
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
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
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                            </svg>
                            <button  onClick={() => navigate("/registerCompany",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role}})}>
                                            Company
                            </button>
                        </li>
                        </ul>
                    </aside>
                    <main class="flex-col bg-indigo-50 w-full ml-4 pr-6">
                    <div class="flex p-4 bg-white items-center mt-3 rounded-xl shadow-lg">
                        <h1 class="text-4xl font-bold text-gray-700">Welcome, {state.firstName}</h1>
                    </div>
                        <div class="flex justify-between mt-4 space-x-4 s">
                            <div class="bg-white w-1/3 rounded-xl shadow-lg flex items-center justify-around">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-indigo-500" fill="none" viewBox="0 0 24 24" height="100px" width="100px" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>               
                                <div class="text-center">
                                    <h1 class="text-4xl font-bold text-gray-800">{entrepreneurInfo.companiesNo}</h1>
                                    <span class="text-gray-500">Companies Integrated</span>
                                </div>
                            </div>
                            <div class="bg-white w-1/3 rounded-xl shadow-lg flex items-center justify-around">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                                </svg>
                                <div class="text-center">
                                    <h1 class="text-4xl font-bold text-gray-800">{entrepreneurInfo.ideasNo}</h1>
                                    <span class="text-gray-500">Ideas Generated</span>
                                </div>
                            </div>
                            <div class="bg-white w-1/3 rounded-xl shadow-lg flex items-center justify-around">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                                </svg>
                                <div class="text-center">
                                    <h1 class="text-4xl font-bold text-gray-800">{entrepreneurInfo.earnings}</h1>
                                    <span class="text-gray-500">Profit</span>
                                </div>
                            </div>
                        </div>
                        <div class="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
                            <section class="container mx-auto p-6 font-mono">
                                <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                    <div class="w-full overflow-x-auto">
                                        <h2 class="mb-10 font-mono text-3xl font-bold">Your Companies overview</h2>
                                        <table class="w-full">
                                            <thead>
                                                <tr class="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                    <th class="px-4 py-3">Name</th>
                                                    <th class="px-4 py-3">Industry</th>
                                                    <th class="px-4 py-3">Size</th>
                                                    <th class="px-4 py-3">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white">
                                                {
                                                    entrepreneurInfo.companies.map((item) => (
                                                        <tr class="text-gray-700">
                                                            <td class="px-4 py-3 border">
                                                                <div class="text-sm">
                                                                    <div>
                                                                        <p class="font-semibold text-black">Company Name</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-4 py-3 text-xs font-semibold border">{item.industry}</td>
                                                            <td class="px-4 py-3 text-xs font-semibold border">{item.size}</td>
                                                            {item.status === 'Active' &&
                                                                <td class="px-4 py-3 text-xs border">
                                                                    <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {item.status} </span>
                                                                </td>
                                                            }
                                                            {(item.status === 'Under Review' || item.status === 'Awaiting Review') &&
                                                                <td class="px-4 py-3 text-xs border">
                                                                    <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-gray-100 rounded-sm"> {item.status} </span>
                                                                </td>
                                                            }
                                                            {!item.isActive &&
                                                                <td class="px-4 py-3 text-xs border">
                                                                    <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-red-100 rounded-sm"> {item.status} </span>
                                                                </td>
                                                            }
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>        
        </div>
        )
    }
}


export default EntrepreneurDashboard;