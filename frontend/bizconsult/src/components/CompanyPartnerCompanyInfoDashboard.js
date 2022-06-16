import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

async function requestCollaboration(collaborationData) {
    return fetch('http://localhost:8080/requestCollaboration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collaborationData)
    })
      .then(data => data.json())
   }

const CompanyPartnerCompanyInfoDashboard = () => {
    const {state} = useLocation();

    const [companyInfo, setCompanyInfo] = useState();
    const [isLoading, setIsLoading] = useState(1);
    const emailAddress = state.emailAddress;
    const partnerCompanyId = state.partnerCompanyId;
    const requestCompanyId = state.companyId;
    const offerCompanyId = state.partnerCompanyId;
    const companyId = state.companyId;
    const dummy = 'dummyIndustry';
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [hasDesiredProfit, setHasDesiredProfit] = useState();
    const [desiredProfitMetric, setDesiredProfitMetric] = useState(); 

    const [showModal, setShowModal] = useState(false);

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

    const handleRequestCollaboration = async e => {

        e.preventDefault();

        await requestCollaboration({
            offerCompanyId,
            requestCompanyId,
            startDate,
            endDate,
            hasDesiredProfit,
            desiredProfitMetric,
        });
        setShowModal(false);
        navigate("/collaborations", {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: state.companyId, companyName: state.companyName}})

    }


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
                            <button  onClick={() => navigate("/companyDashboard",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: companyId, companyName: state.companyName}})}>
                                            Dashboard
                            </button>
                        </li>
                        <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                            <button  onClick={() => navigate("/partnerSearch",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: companyId, companyName: state.companyName}})}>
                                            Add Partner
                            </button>
                        </li>
                        <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                            </svg>     
                            <button  onClick={() => navigate("/collaborations",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: state.companyId, companyName: state.companyName}})}>
                                            Collaborations
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
                        <div class="flex justify-between space-x-4 s">
                            <div class=" w-1/3 rounded-xl mx-auto flex justify-start">
                                <div class="mx-10 my-20 w-full">
                                    <button
                                            className="w-8/12  bg-indigo-500 items-center text-white hover:bg-indigo-600 active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {setShowModal(true)}}
                                        >
                                            Request Collaboration
                                    </button>
                                </div>                                  
                            </div>
                        </div>
                        {showModal ? (
                                        <>
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div className="relative w-1/4 my-6 mx-auto max-w-3xl">
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    <div className="justify-between border-b border-solid border-slate-200 rounded-t">
                                                        <button
                                                            className="p-1 mr-1 mt-0 text-right bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                            onClick={() => setShowModal(false)}>
                                                            <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                            ×
                                                            </span>
                                                        </button>
                                                        <h3 className="text-xl ml-5 p-5 font-semibold">
                                                            Enter Request Information
                                                        </h3>
                                                    </div>
                                                    <div class="py-8 px-5 md:px-10 bg-white">
                                                        <label for="email2" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Start Date</label>
                                                        <input type="date" name="floating_last_name" id="floating_last_name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder=" " required onChange={e => setStartDate(e.target.value)}/>
                                                        <label for="expiry" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">End Date</label>
                                                        <input type="date" name="floating_last_name" id="floating_last_name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder=" " required onChange={e => setEndDate(e.target.value)}/>
                                                        <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Profit-based Collaboration?</label>
                                                        <input type="checkbox" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" onChange={e => e.target.value === 'on' ? setHasDesiredProfit(true) : setHasDesiredProfit(false)}/>
                                                        <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Expected Profit</label>
                                                        <input id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" onChange={e => setDesiredProfitMetric(e.target.value)}/>
                                                    </div>
                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                        <button
                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => setShowModal(false) }>
                                                            Close
                                                        </button>
                                                        <button
                                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={handleRequestCollaboration}
                                                            >
                                                            Request
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </>
                                         ) : null}
                    </main>
                </div>
            </div>        
        </div>
        )
    }
}


export default CompanyPartnerCompanyInfoDashboard;