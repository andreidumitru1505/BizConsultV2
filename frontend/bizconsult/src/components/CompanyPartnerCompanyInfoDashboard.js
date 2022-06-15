import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const CompanyPartnerCompanyInfoDashboard = () => {
    const {state} = useLocation();

    const [companyInfo, setCompanyInfo] = useState();
    const [isLoading, setIsLoading] = useState(1);
    const emailAddress = state.emailAddress;
    const partnerCompanyId = state.partnerCompanyId;
    const companyId = state.companyId;
    const dummy = 'dummyIndustry';
    const navigate = useNavigate();

    useEffect(() => {
        console.log(state);
        fetch('http://localhost:8080/getCompanyInfo',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dummy, partnerCompanyId})
        })
            .then(response => response.json())
            .then(data => {setCompanyInfo(data);console.log(data);setIsLoading(0)})

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
                <div class="flex h-10/12 bg-gray-100 rounded-xl m-3 mt-12 shadow-xl">
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
                    <main class="flex-col bg-indigo-50 w-full ml-4 pr-6 overflow-auto">
                        <div class="flex justify-between mt-4 space-x-4 s">
                            <div class="bg-white w-1/2 rounded-xl mx-auto shadow-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
                                </svg>
                                <div class="text-center">
                                    <h1 class="text-4xl font-bold text-gray-800">Company Information</h1>
                                </div>                                  
                            </div>
                            <div class="bg-white w-1/2 rounded-xl shadow-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                                <div class="text-center">
                                    <h1 class="text-4xl font-bold text-gray-800">Entrepreneur Information</h1>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-between mt-4 space-x-4 s">
                            <div class="bg-white w-1/2 rounded-xl shadow-lg items-center flex">
                                <div class="mt-5 mr-10 w-1/2">
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Name</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.companyInfo.name}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Website</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.companyInfo.website}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="number" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">City</label>
                                        <p type="time" id="time" name="time" placeholder="time" 
                                            class=" w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.companyInfo.city}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Founded on</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.companyInfo.foundedDate}</p>
                                    </div>
                                </div>
                                <div class="mt-5 mr-10 w-1/2">
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Rating</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.companyInfo.rating}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Size</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.companyInfo.size}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Country</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.companyInfo.country}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Successful Collaborations</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.successCollaborations}</p>
                                    </div>
                                </div>                              
                            </div>
                            <div class="bg-white w-1/2 rounded-xl shadow-lg items-center flex">
                                <div class="mt-5 mr-10 ml-10 w-full">
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">First Name</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.entrepreneurInfo.firstName}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Last Name</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.entrepreneurInfo.lastName}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Email Address</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.entrepreneurInfo.emailAddress}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Phone Number</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{companyInfo.entrepreneurInfo.phoneNumber}</p>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div class="flex justify-between mt-4 space-x-4 s">
                            <div class="bg-white w-1/2 rounded-xl mx-auto shadow-lg flex justify-start">
                                <div class="mx-10 my-5 w-full">
                                    <div class=" z-0 select-none">
                                            <label for="floating_email" class="font-bold text-gray-600 text-2xl">Description</label>
                                            <textarea readOnly type="text" rows="3" name="floating_email" value={companyInfo.companyInfo.description !== null ? companyInfo.companyInfo.description : ''}class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required>
                                                
                                            </textarea>
                                    </div>
                                </div>                                  
                            </div>
                        </div>
                    </main>
                </div>
            </div>        
        </div>
        )
    }
}


export default CompanyPartnerCompanyInfoDashboard;