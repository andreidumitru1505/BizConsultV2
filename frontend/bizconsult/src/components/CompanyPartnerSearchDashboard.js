import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const CompanyPartnerSearchDashboard = () => {
    const {state} = useLocation();


    const autoTransportationString = 'Auto & transportation';
    const logisticsString = 'Supply chain, logistics, & delivery';
    const retailString = "Consumer & retail";
    const ecommerceString = "E-commerce & direct-to-consumer";

    const [companies, setCompanies] = useState();
    const [isLoading, setIsLoading] = useState(1);
    const emailAddress = state.emailAddress;
    const companyId = state.companyId;
    const dummy = 'dummyIndustry';
    const navigate = useNavigate();
    const [industry,setIndustry] = useState('Artificial Intelligence')

    useEffect(() => {
        console.log(state);
        fetch('http://localhost:8080/getCompaniesByIndustry',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailAddress, industry})
        })
            .then(response => response.json())
            .then(data => {setCompanies(data); setIsLoading(0)})

    }, [industry]);


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
                    </aside>
                    <main class="flex-col bg-indigo-50 w-full ml-4 pr-6">
                        <div class="flex p-4 bg-white items-center mt-3 rounded-xl shadow-lg">
                            <h1 class="text-4xl font-bold text-gray-700">{state.companyName}</h1>
                        </div>
                        <div class="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
                            <section class="container mx-auto p-6 font-mono">
                                <div class=" mb-8 overflow-hidden rounded-lg shadow-lg">
                                    <div class=" overflow-x-auto">
                                        <div class="text-center mx-auto mb-10 w-3/12 items-center">
                                            <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Industry</label>
                                            <select class="mb-5 bg-white mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-semibold w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" defaultValue='Artificial Intelligence' onChange={e => setIndustry(e.target.value)}>
                                                                <option value="Artificial intelligence">Artificial intelligence</option>
                                                                <option value={autoTransportationString}>Auto {'&'} transportation</option>
                                                                <option value="Edtech">Edtech</option>
                                                                <option value="Internet Services">Internet Services</option>
                                                                <option value='Fintech'>Fintech</option>
                                                                <option value="Hardware">Hardware</option>
                                                                <option value="Health">Health</option>
                                                                <option value={logisticsString}>Supply chain, logistics, {'&'} delivery</option>
                                                                <option value={retailString}>Consumer {'&'} retail</option>
                                                                <option value={ecommerceString}>E-commerce {'&'} direct-to-consumer</option>
                                                                <option value="Travel">Travel</option>
                                                                <option value="Law Consultation">Law Consultation</option>
                                            </select> 
                                        </div>
                                        <table class="w-full">
                                            <thead>
                                                <tr class="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                    <th class="px-4 py-3">Company</th>
                                                    <th class="px-4 py-3">Industry</th>
                                                    <th class="px-4 py-3">Website</th>
                                                    <th class="px-4 py-3">City</th>
                                                    <th class="px-4 py-3">Country</th>
                                                    <th class="px-4 py-3">Rating</th>
                                                    <th class="px-4 py-3">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white">
                                                {
                                                    companies.map((item) => (
                                                        <tr class="text-gray-700">
                                                            <td class="px-4 py-3 border">
                                                                <div class=" text-sm">
                                                                    <div>
                                                                        <p class="font-semibold text-black">{item.name}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-4 py-3 border">
                                                                <div class=" text-sm">
                                                                    <div>
                                                                        <p class="font-semibold text-black">{item.industry}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-4 py-3 border">
                                                                <div class=" text-sm">
                                                                    <div>
                                                                        <p class="font-semibold text-black">{item.website}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-4 py-3 border">
                                                                <div class=" text-sm">
                                                                    <div>
                                                                        <p class="font-semibold text-black">{item.city}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-4 py-3 border">
                                                                <div class=" text-sm">
                                                                    <div>
                                                                        <p class="font-semibold text-black">{item.country}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-4 py-3 border">
                                                                <div class=" text-sm">
                                                                    <div>
                                                                        <p class="font-semibold text-black">{item.rating}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-4 py-3 text-xs font-semibold border">
                                                                <button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl mx-auto gap-2 text-ms"
                                                                    onClick={() => navigate("/partnerCompanyInfo",
                                                                    {state:{firstName:state.firstName, lastName:state.lastName, emailAddress:state.emailAddress, role:state.role, companyId: companyId, partnerCompanyId: item.companyId, companyName: state.companyName}})}>
                                                                    <span>See more</span>
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


export default CompanyPartnerSearchDashboard;