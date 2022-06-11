import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const EntrepreneurDashboardProfile = () => {
    const {state} = useLocation();
    const scienceEngineeringString = 'Science & Engineering';

    const [profileData, setProfileData] = useState();
    const [isLoading, setIsLoading] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const emailAddress = state.emailAddress;
    const dummy = 'dummyIndustry';
    const navigate = useNavigate();

    const [firstNameUpdate, setFirstNameUpdate] = useState();
    const [lastNameUpdate, setLastNameUpdate] = useState();
    const [ageUpdate, setAgeUpdate] = useState();
    const [genderUpdate, setGenderUpdate] = useState();
    const [phoneNumberUpdate, setPhoneNumberUpdate] = useState();
    const [studiesFieldUpdate, setStudiesFieldUpdate] = useState();

    useEffect(() => {
        fetch('http://localhost:8080/getProfileInfo',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailAddress, dummy})
        })
            .then(response => response.json())
            .then(data => {setProfileData(data[0]);setIsLoading(0)})

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
                            <div class="bg-white rounded-xl p-10 md:w-3/4 lg:w-1/2 mx-auto">

                                <form class="mr-10" action="">
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">First Name</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{profileData.firstName}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Last Name</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{profileData.lastName}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Age</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{profileData.age} years old</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="name" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Gender</label>
                                        <p class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{profileData.gender}</p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="number" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Phone Number</label>
                                        <p type="time" id="time" name="time" placeholder="time" 
                                            class=" w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{profileData.phoneNumber} </p>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <label for="number" class="inline-block w-40 mr-6 text-right 
                                                                font-bold text-gray-600">Studies</label>
                                        <p type="time" id="time" name="time" placeholder="time" 
                                            class="w-full py-2 border-b-2 border-gray-400 focus:border-green-400 
                                                    text-gray-600 placeholder-gray-400
                                                    outline-none">{profileData.studiesField} </p>
                                    </div>
                                    <>
                                    <div class="text-right">
                                        <button
                                            className="bg-pink-500 items-center text-white active:bg-pink-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Edit your profile
                                        </button>
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
                                                        Update your information
                                                    </h3>
                                                </div>
                                                <div class="py-8 px-5 md:px-10 bg-white">
                                                    <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">First Name</label>
                                                    <input id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={profileData.firstName} onChange={e => setFirstNameUpdate(e.target.value)}/>
                                                    <label for="email2" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Last Name</label>
                                                    <input id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={profileData.lastName} onChange={e => setLastNameUpdate(e.target.value)}/>
                                                    <label for="expiry" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Age</label>
                                                    <input id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={profileData.age} onChange={e => setAgeUpdate(e.target.value)}/>
                                                    <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Gender</label>
                                                    <input id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={profileData.gender} onChange={e => setGenderUpdate(e.target.value)}/>
                                                    <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Phone Number</label>
                                                    <input id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={profileData.phoneNumber} onChange={e => setPhoneNumberUpdate(e.target.value)}/>
                                                    <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Studies</label>
                                                    <select class="mb-5 bg-white mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={profileData.studiesField} onChange={e => setStudiesFieldUpdate(e.target.value)}>
                                                        <option value="Law">Law</option>
                                                        <option value="Computer Sciene">Computer Science</option>
                                                        <option value="Medicine">Medicine</option>
                                                        <option value="Software Engineering">Software Engineering</option>
                                                        <option value="Business Administration">Business Administration</option>
                                                        <option value="Social Sciences">Social Sciences</option>
                                                        <option value={scienceEngineeringString}>Science {'&'} Engineering</option>
                                                        <option value="Psychology">Psychology</option>
                                                        <option value="Electrical Engineering">Electrical Engineering</option>
                                                        <option value="Marketing">Marketing</option>
                                                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                        <option value="Robotics">Robotics</option>
                                                        <option value="Journalism">Journalism</option>
                                                        <option value="Telecommunications">Telecommunications</option>
                                                        <option value="Finance">Finance</option>
                                                        <option value="Logistics">Logistics</option>
                                                        <option value="Tourism">Tourism</option>
                                                        <option value="Transportation">Transportation</option>
                                                    </select>
                                                </div>
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}>
                                                        Close
                                                    </button>
                                                    <button
                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}>
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                ) : null}
                                </>
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