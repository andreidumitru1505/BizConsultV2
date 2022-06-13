import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const ExpertDashboardRejectedApplications = () => {
    const {state} = useLocation();

    const [rejectedApplications, setRejectedApplications] = useState();
    const [isLoading, setIsLoading] = useState(1);
    const emailAddress = state.emailAddress;
    const dummy = 'dummyIndustry';
    const navigate = useNavigate();

    useEffect(() => {
        console.log(state);
        fetch('http://localhost:8080/getRejectedApplications',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailAddress, dummy})
        })
            .then(response => response.json())
            .then(data => {setRejectedApplications(data);setIsLoading(0)})

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
                        <h1 class="text-white font-bold mr-2 cursor-pointer">Applications</h1>
                        <ul>
                        <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            <button  onClick={() => navigate("/expertDashboard",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role}})}>
                                            Dashboard
                            </button>
                        </li>
                        <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                            </svg> 
                            <button  onClick={() => navigate("/expertDashboardOpenApplications",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role}})}>
                                            Open
                            </button>
                        </li>
                        <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                            <button  onClick={() => navigate("/expertDashboardUnderReviewApplications",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role}})}>
                                            Reviewing
                            </button>
                        </li>
                        <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            <button  onClick={() => navigate("/expertDashboardAcceptedApplications",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role}})}>
                                            Accepted
                            </button>
                        </li>
                        <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                            </svg>
                            <button  onClick={() => navigate("/expertDashboardRejectedApplications",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role}})}>
                                            Rejected
                            </button>
                        </li>
                        </ul>
                        <h1 class="text-white font-bold mr-2 cursor-pointer">Settings</h1>
                    </aside>
                    <main class="flex-col bg-indigo-50 w-full ml-4 pr-6">
                        <div class="flex p-4 bg-white items-center mt-3 rounded-xl shadow-lg">
                            <h1 class="text-4xl font-bold text-gray-700">Welcome, {state.firstName}</h1>
                        </div>
                        <div class="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
                            <section class="container mx-auto p-6 font-mono">
                                <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                    <div class="w-full overflow-x-auto">
                                        <h2 class="mb-10 font-mono text-3xl font-bold">Take a look at the applications you have rejected</h2>
                                        <table class="w-full">
                                            <thead>
                                                <tr class="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                    <th class="px-4 py-3">Company</th>
                                                    <th class="px-4 py-3">Size</th>
                                                    <th class="px-4 py-3">Value</th>
                                                    <th class="px-4 py-3">Founded On</th>
                                                    <th class="px-4 py-3">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white">
                                                {
                                                    rejectedApplications.map((item) => (
                                                        <tr class="text-gray-700">
                                                            <td class="px-4 py-3 border">
                                                                <div class="text-sm">
                                                                    <div>
                                                                        <p class="font-semibold text-black">{item.name}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-4 py-3 text-xs font-semibold border">{item.size}</td>
                                                            <td class="px-4 py-3 text-xs font-semibold border">{item.value}</td>
                                                            <td class="px-4 py-3 text-xs font-semibold border">{item.foundedDate}</td>
                                                            <td class="px-4 py-3 text-xs font-semibold border">
                                                                <button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl mx-auto gap-2 text-ms"
                                                                    onClick={() => navigate("/reviewApplication",
                                                                    {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: item.id}})}>
                                                                    <span>Open</span>
                                                                </button>
                                                            </td>
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


export default ExpertDashboardRejectedApplications;