import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const CompanyCollaborationInfoDashboard = () => {
    const {state} = useLocation();


    const emailAddress = state.emailAddress;
    const navigate = useNavigate();
    const companyId = state.companyId;
    const collaborationId = state.collaborationId
    const [collaborationData, setCollaborationData] = useState();
    const [isLoading, setIsLoading] = useState(1);

    useEffect(() => {
        fetch('http://localhost:8080/getCollaborationInfo',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({companyId, collaborationId})
        })
            .then(response => response.json())
            .then(data => {setCollaborationData(data);setIsLoading(0)})

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
                            <button  onClick={() => navigate("/companyDashboard",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: companyId}})}>
                                            Dashboard
                            </button>
                        </li>
                        <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                            <button  onClick={() => navigate("/partnerSearch",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: companyId}})}>
                                            Add Partner
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
                                <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                            </svg>     
                            <button  onClick={() => navigate("/collaborations",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: state.companyId}})}>
                                            Collaborations
                            </button>
                        </li>
                        </ul>
                    </aside>
                    <main class="flex-col bg-indigo-50 w-full ml-4 pr-6">
                        <div class="flex p-4 bg-white items-center mt-3 rounded-xl shadow-lg">
                            <h1 class="text-4xl font-bold text-gray-700">Overview on the collaboration</h1>
                        </div>
                        <div class="flex justify-between mt-4 space-x-4 s">
                            <div class="bg-white w-full rounded-xl shadow-lg items-center flex ">
                                        <div class='w-1/2 my-10 mx-10'>
                                            <div class="flex items-center mb-5">
                                                <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                        font-bold text-gray-600">Partner</label>
                                                <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                            text-gray-600 placeholder-gray-400
                                                            outline-none">{collaborationData.partnerCompanyName}</p>
                                            </div>
                                            <div class="flex items-center mb-5">
                                                <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                        font-bold text-gray-600">Business Side</label>
                                                <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                            text-gray-600 placeholder-gray-400
                                                            outline-none">{collaborationData.collaborationSide}</p>
                                            </div>
                                            <div class="flex items-center mb-5">
                                                <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                        font-bold text-gray-600">Source</label>
                                                <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                            text-gray-600 placeholder-gray-400
                                                            outline-none">{collaborationData.isExternal ? 'External' : 'Platform'}</p>
                                            </div>
                                            <div class="flex items-center mb-5">
                                                <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                        font-bold text-gray-600">Start Date</label>
                                                <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                            text-gray-600 placeholder-gray-400
                                                            outline-none">{collaborationData.startDate}</p>
                                            </div>
                                            <div class="flex items-center mb-5">
                                                <label for="number" class="inline-block w-40 mr-6 text-right 
                                                                        font-bold text-gray-600">End Date</label>
                                                <p type="time" id="time" name="time" placeholder="time" 
                                                    class=" w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                            text-gray-600 placeholder-gray-400
                                                            outline-none">{collaborationData.endDate}</p>
                                            </div>
                                        </div>
                                        <div class='w-1/2 my-10 mx-10'>
                                            <div class="flex items-center mb-5">
                                                <label for="number" class="inline-block w-40 mr-6 text-right 
                                                                        font-bold text-gray-600">Status</label>
                                                <p type="time" id="time" name="time" placeholder="time" 
                                                    class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                            text-gray-600 placeholder-gray-400
                                                            outline-none">{collaborationData.status} </p>
                                            </div>
                                            <div class="flex items-center mb-5">
                                                <label for="number" class="inline-block w-40 mr-6 text-right 
                                                                        font-bold text-gray-600">Profit-based</label>
                                                <p type="time" id="time" name="time" placeholder="time" 
                                                    class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                            text-gray-600 placeholder-gray-400
                                                            outline-none">{collaborationData.hasDesiredProfit ? 'Yes' : 'No'} </p>
                                            </div>
                                            {collaborationData.hasDesiredProfit &&
                                            <div>
                                                <div class="flex items-center mb-5">
                                                    <label for="number" class="inline-block w-40 mr-6 text-right 
                                                                            font-bold text-gray-600">Desired Profit</label>
                                                    <p type="time" id="time" name="time" placeholder="time" 
                                                        class=" w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                                text-gray-600 placeholder-gray-400
                                                                outline-none">{collaborationData.desiredProfitMetric}</p>
                                                </div>
                                                <div class="flex items-center mb-5">
                                                    <label for="number" class="inline-block w-40 mr-6 text-right 
                                                                            font-bold text-gray-600">Actual Profit</label>
                                                    <p type="time" id="time" name="time" placeholder="time" 
                                                        class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                                text-gray-600 placeholder-gray-400
                                                                outline-none">{collaborationData.actualProfitMetric} </p>
                                                </div>
                                            </div>
                                            }
                                            <div class="flex items-center mb-5">
                                                    <label for="number" class="inline-block w-40 mr-6 text-right 
                                                                            font-bold text-gray-600">Success</label>
                                                    <p type="time" id="time" name="time" placeholder="time" 
                                                        class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                                text-gray-600 placeholder-gray-400
                                                                outline-none">{collaborationData.isSuccess ? 'Yes' : 'No'} </p>
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


export default CompanyCollaborationInfoDashboard;