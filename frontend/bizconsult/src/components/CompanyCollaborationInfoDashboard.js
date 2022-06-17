import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';


async function acceptCollaboration(collaborationData) {
    return fetch('http://localhost:8080/acceptCollaboration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collaborationData)
    })
      .then(data => data.json())
   }

async function refuseCollaboration(collaborationData) {
    return fetch('http://localhost:8080/refuseCollaboration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collaborationData)
    })
      .then(data => data.json())
   }

async function proposeFinishCollaboration(collaborationData) {

    console.log(collaborationData)
    return fetch('http://localhost:8080/proposeFinishCollaboration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collaborationData)
    })
      .then(data => data.json())
   }

async function acceptFinishCollaboration(collaborationData) {
    return fetch('http://localhost:8080/acceptProposedFinishCollaboration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collaborationData)
    })
      .then(data => data.json())
   }

async function refuseFinishCollaboration(collaborationData) {
    return fetch('http://localhost:8080/refuseProposedFinishCollaboration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collaborationData)
    })
      .then(data => data.json())
   }

const CompanyCollaborationInfoDashboard = () => {
    const {state} = useLocation();


    const emailAddress = state.emailAddress;
    const navigate = useNavigate();
    const companyId = state.companyId;
    const collaborationId = state.collaborationId
    const [collaborationData, setCollaborationData] = useState();
    const [isLoading, setIsLoading] = useState(1);
    const dummy = 'dummy';
    const [showModal, setShowModal] = useState(false);
    const [proposeFinishProfitMetric, setProposeFinishProfitMetric] = useState();
    const [proposeFinishSuccess, setProposeFinishSuccess] = useState();
    const [requestCompanyReview, setRequestCompanyReview]= useState()

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

    const handleAcceptCollaboration = async e => {

        e.preventDefault();

        await acceptCollaboration({
            collaborationId,
            dummy
        });

        navigate("/collaborations", {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: state.companyId, companyName: state.companyName}})
    }
    const handleRefuseCollaboration = async e => {

        e.preventDefault();

        await refuseCollaboration({
            collaborationId,
            dummy
        });

        navigate("/collaborations", {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: state.companyId, companyName: state.companyName}})
    }

    const handleProposeFinish = async e => {

        e.preventDefault();

        await proposeFinishCollaboration({
            collaborationId,
            requestCompanyReview,
            proposeFinishSuccess,
            proposeFinishProfitMetric
        });

        navigate("/collaborations", {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: state.companyId, companyName: state.companyName}})
    }

    const handleAcceptProposedFinish = async e => {

        e.preventDefault();

        await acceptFinishCollaboration({
            collaborationId,
            dummy
        });

        navigate("/collaborations", {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: state.companyId, companyName: state.companyName}})
    }

    const handleRefuseProposedFinish = async e => {

        e.preventDefault();

        await refuseFinishCollaboration({
            collaborationId,
            dummy
        });

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
                        <li class="flex space-x-2 mt-4 px-6 py-4 text-white hover:bg-white hover:text-blue-800 font-bold hover:rounded-br-3xl transition duration-100 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                            </svg>
                            <button  onClick={() => navigate("/companyReviews",
                                            {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: state.companyId, companyName: state.name}})}>
                                            Reviews
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
                        {collaborationData.status === 'Awaiting Response' &&
                        collaborationData.collaborationSide === 'Offer Service' &&
                        <div class="flex justify-between space-x-4 s">
                            <div class=" w-2/3 rounded-xl mx-auto flex justify-start">
                                <div class="mx-10 my-20 w-full">
                                    <button
                                            className="w-8/12  bg-red-500 items-center text-white hover:bg-red-600 active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={handleRefuseCollaboration}
                                        >
                                            Refuse Collaboration
                                    </button>
                                </div>
                                <div class="mx-10 my-20 w-full">
                                    <button
                                            className="w-8/12  bg-indigo-500 items-center text-white hover:bg-indigo-600 active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={handleAcceptCollaboration}
                                        >
                                            Accept Collaboration
                                    </button>
                                </div>                                 
                            </div>
                        </div>
                        }
                        {collaborationData.status === 'Ongoing' &&
                        collaborationData.collaborationSide === 'Request Service' &&
                        collaborationData.proposeFinish === null &&
                        <div class="flex justify-between space-x-4 s">
                            <div class=" w-1/3 rounded-xl mx-auto flex justify-start">
                                <div class="mx-10 my-20 w-full">
                                    <button
                                            className="w-8/12  bg-indigo-500 items-center text-white hover:bg-indigo-600 active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Finish Collaboration
                                    </button>
                                </div>                             
                            </div>
                        </div>
                        }
                        {collaborationData.status === 'Ongoing' &&
                        collaborationData.collaborationSide === 'Offer Service' &&
                        collaborationData.proposeFinish === 1 && 
                            <div class="flex justify-between mt-4 s">
                                <div class="w-full items-center flex">
                                    <div class="bg-white w-6/12 flex-col rounded-xl shadow-lg ">
                                        <div class="py-5">
                                            <h1 class="items-center text-2xl text-semibold text-center">Partner Company Finish Collaboration Proposal</h1>
                                        </div>
                                        {collaborationData.hasDesiredProfit &&
                                        <div class=" mx-auto w-full">
                                            <div class="flex py-3 items-center">
                                                <label for="number" class="inline-block w-44 mr-10 ml-10 text-right 
                                                                        font-bold text-gray-600">Proposed Profit</label>
                                                <p type="time" id="time" name="time" placeholder="time" 
                                                    class="w-7/12 py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                            text-gray-600 placeholder-gray-400
                                                            outline-none">{collaborationData.proposeFinishProfitMetric} RON</p>
                                            </div>
                                        </div>
                                        }
                                        <div class=" mx-auto w-full">
                                            <div class="flex pt-3 pb-10 items-center">
                                                <label for="number" class="inline-block w-44 ml-10 mr-10 text-right 
                                                                        font-bold text-gray-600">Collaboration Success</label>
                                                <p type="time" id="time" name="time" placeholder="time" 
                                                    class="w-7/12 py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                            text-gray-600 placeholder-gray-400
                                                            outline-none">{collaborationData.proposeFinishSuccess ? 'Yes' : 'No'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mx-auto flex-col w-1/2 ">
                                        <div>
                                            <button
                                                    className="w-4/12 mt-7  bg-green-500 items-center text-white hover:bg-green-600 active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={handleAcceptProposedFinish}
                                                >
                                                    Accept {'&'} Finish
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                    className="w-4/12 mt-10  bg-red-500 items-center text-white hover:bg-red-600 active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={handleRefuseProposedFinish}
                                                >
                                                    Decline
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                                  
                            </div>
                        }
                                                
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
                                        Enter Collaboration Progress Information
                                    </h3>
                                </div>
                                <div class=" mx-10 bg-white">
                                    {collaborationData.hasDesiredProfit && 
                                    <div className="my-10 items-center">
                                        <label for="name" class="text-gray-800 text-l font-bold">Profit Obtained</label>
                                        <input id="name" class="mb-5 mt-5  text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" onChange={e => setProposeFinishProfitMetric(e.target.value)}/>
                                    </div>
                                    }
                                    <div class="my-10 items-center">
                                        <label for="email2" class="text-gray-800 text-l font-bold leading-tight tracking-normal">Would you call your collaboration a success?</label>
                                        <input type="checkbox" name="floating_last_name" id="floating_last_name" class="mb-5 mt-5  text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder=" " required onChange={e => e.target.value === 'on' ? setProposeFinishSuccess(true) : setProposeFinishSuccess(false)}/>
                                    </div>
                                    <div class="my-10 items-center">
                                        <label for="email2" class="text-gray-800 text-l font-bold leading-tight tracking-normal">Please leave a short review of your collaboration</label>
                                        <div class=" bg-white">
                                                <textarea type="text" rows="5" name="floating_email" class="mb-5 mt-5  text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder=" " required onChange={e => setRequestCompanyReview(e.target.value)}>
                                                </textarea>
                                        </div>
                                    </div>
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
                                        onClick={handleProposeFinish}
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
                    </main>
                </div>
            </div>
        </div>
        )
    }
}


export default CompanyCollaborationInfoDashboard;