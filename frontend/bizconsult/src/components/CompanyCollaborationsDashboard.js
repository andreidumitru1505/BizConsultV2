import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

async function insertCollaboration(collaborationData) {
    return fetch('http://localhost:8080/insertExternalCollaborations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collaborationData)
    })
      .then(data => data.json())
   }

const CompanyCollaborationsDashboard = () => {
    const {state} = useLocation();

    const [requestCompanyName, setRequestCompanyName] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [hasDesiredProfit, setHasDesiredProfit] = useState(false);
    const [desiredProfitMetric, setDesiredProfitMetric] = useState();
    const [actualProfitMetric, setActualProfitMetric] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [status, setStatus] = useState('Ongoing');


    const [collaborations, setCollaborations] = useState();
    const [isLoading, setIsLoading] = useState(1);
    const emailAddress = state.emailAddress;
    const companyId = state.companyId;
    const dummy = 'dummyIndustry';
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState();
    const [refresh, setRefresh] = useState(0);

    const handleInsertCollaboration = async e => {

        e.preventDefault();

        await insertCollaboration({
            companyId,
            requestCompanyName,
            startDate,
            endDate,
            hasDesiredProfit,
            desiredProfitMetric,
            actualProfitMetric,
            isSuccess
        });
        setShowModal(false);

        if(refresh === 0){
            setRefresh(1);
        }
        else {
            setRefresh(0);
        }
    }

    useEffect(() => {
        console.log(state);
        fetch('http://localhost:8080/getCompanyCollaborations',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({companyId, status})
        })
            .then(response => response.json())
            .then(data => {setCollaborations(data); setIsLoading(0)})

    }, [refresh, status]);


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
                <div class="flex bg-gray-100 rounded-xl m-3 h-5/6 mt-12 shadow-xl">
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
                            <h1 class="text-4xl font-bold text-gray-700">Welcome, {state.firstName}</h1>
                        </div>
                        <div class="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
                            <section class="container mx-auto p-6 font-mono">
                                <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                    <div class="w-full overflow-x-auto">
                                        <div class="text-center mb-10">
                                            <button
                                                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl items-center gap-2"
                                                type="button"
                                                onClick={() => setShowModal(true)}
                                            >
                                                Add External Collaboration
                                            </button>
                                        </div>
                                        <div class="text-center mx-auto mb-10 w-3/12 items-center">
                                            <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Status</label>
                                            <select class="mb-5 bg-white mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-semibold w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" defaultValue='Ongoing' onChange={e => setStatus(e.target.value)}>
                                                                <option value="Ongoing">Ongoing</option>
                                                                <option value="Awaiting Response">Awaiting Response</option>
                                                                <option value="Completed">Completed</option>
                                                                <option value="Refused">Refused</option>
                                            </select> 
                                        </div>
                                        <table class="w-full">
                                            <thead>
                                                <tr class="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                    <th class="px-4 py-3">Partner Company</th>
                                                    <th class="px-4 py-3">Business Side</th>
                                                    <th class="px-4 py-3">Status</th>
                                                    <th class="px-4 py-3">Success</th>
                                                    <th class="px-4 py-3">External</th>
                                                    <th class="px-4 py-3">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white">
                                                {
                                                    collaborations.map((item) => (
                                                        <tr class="text-gray-700">
                                                            <td class="px-4 py-3 border">
                                                                <div class=" text-sm">
                                                                    <div>
                                                                        <p class="font-semibold text-black">{item.partnerCompanyName}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-4 py-3 border">
                                                                <div class=" text-sm">
                                                                    <div>
                                                                        <p class="font-semibold text-black">{item.collaborationSide}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-4 py-3 border">
                                                                <div class=" text-sm">
                                                                    <div>
                                                                        <p class="font-semibold text-black">{item.status}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {
                                                            item.isSuccess ?
                                                            <td class="px-4 py-3 text-xs font-semibold border text-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mx-auto fill-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                                </svg>
                                                            </td>
                                                            :
                                                            <td class="px-4 py-3 text-xs font-semibold border text-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mx-auto fill-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                                                </svg>
                                                            </td>
                                                            }
                                                            {
                                                            item.isExternal ?
                                                            <td class="px-4 py-3 text-xs font-semibold border text-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mx-auto fill-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                                </svg>
                                                            </td>
                                                            :
                                                            <td class="px-4 py-3 text-xs font-semibold border text-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mx-auto fill-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                                                </svg>
                                                            </td>
                                                            }
                                                            <td class="px-4 py-3 text-xs font-semibold border">
                                                                <button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl mx-auto gap-2 text-ms"
                                                                    onClick={() => navigate("/collaborationInfo",
                                                                    {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: companyId, collaborationId: item.collaborationId}})}>
                                                                    <span>See more</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
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
                                                            Enter Collaboration Information
                                                        </h3>
                                                    </div>
                                                    <div class="py-8 px-5 md:px-10 bg-white">
                                                        <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Partner Company Name</label>
                                                        <input id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" onChange={e => setRequestCompanyName(e.target.value)}/>
                                                        <label for="email2" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Start Date</label>
                                                        <input type="date" name="floating_last_name" id="floating_last_name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder=" " required onChange={e => setStartDate(e.target.value)}/>
                                                        <label for="expiry" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">End Date</label>
                                                        <input type="date" name="floating_last_name" id="floating_last_name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder=" " required onChange={e => setEndDate(e.target.value)}/>
                                                        <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Profit-based Collaboration?</label>
                                                        <input type="checkbox" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" onChange={e => e.target.value === 'on' ? setHasDesiredProfit(true) : setHasDesiredProfit(false)}/>
                                                        <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Offerred Profit</label>
                                                        <input id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" onChange={e => setDesiredProfitMetric(e.target.value)}/>
                                                        <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Actual Profit</label>
                                                        <input id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" onChange={e => setActualProfitMetric(e.target.value)}/>
                                                        <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Successful Collaboration</label>
                                                        <input type="checkbox" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"  onChange={e => e.target.value === 'on' ? setIsSuccess(true) : setIsSuccess(false)}/>
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
                                                            onClick={handleInsertCollaboration}
                                                            >
                                                            Save Changes
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </>
                                         ) : null}
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


export default CompanyCollaborationsDashboard;