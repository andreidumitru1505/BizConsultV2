import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import * as constants from "../constants";

const industries = [
    {name: 'Artificial intelligence', value: 1, imgSrc: constants.artificialIntelligenceImg, description: constants.artificialIntelligenceDescription},
    {name: 'Auto & transportation', value: 2, imgSrc: constants.autoTransportationImg, description: constants.autoTransportationDescription},
    {name: 'Edtech', value: 3, imgSrc: constants.edtechImg, description: constants.edtechDescriptin},
    {name: 'Internet Services', value: 4, imgSrc: constants.internetServicesImg, description: constants.internetServicesDescription},
    {name: 'Fintech', value: 5, imgSrc: constants.fintechImg, description: constants.fintechDescription},
    {name: 'Hardware', value: 6, imgSrc: constants.hardwareImg, description: constants.hardwareDescription},
    {name: 'Health', value: 7, imgSrc: constants.healthImg, description: constants.healthDescription},
    {name: 'Supply chain, logistics, & delivery', value: 8, imgSrc: constants.logisticsImg, description: constants.logisticsDescription},
    {name: 'Consumer & retail', value: 9, imgSrc: constants.retailImg, description: constants.retailDescription},
    {name: 'E-commerce & direct-to-consumer', value: 10, imgSrc: constants.ecommerceImg, description: constants.ecommerceDescription},
    {name: 'Travel', value: 11, imgSrc: constants.travelImg, description: constants.travelDescription},
    {name: 'Law Consultation', value: 12, imgSrc: constants.legalServicesImg, description: constants.legalServicesDescription}
]

const industriesMap = new Map([
    [1, {name: 'Artificial intelligence', value: 1, imgSrc: constants.artificialIntelligenceImg, description: constants.artificialIntelligenceDescription}],
    [2, {name: 'Auto & transportation', value: 2, imgSrc: constants.autoTransportationImg, description: constants.autoTransportationDescription}],
    [3, {name: 'Edtech', value: 3, imgSrc: constants.edtechImg, description: constants.edtechDescriptin}],
    [4, {name: 'Internet Services', value: 4, imgSrc: constants.internetServicesImg, description: constants.internetServicesDescription}],
    [5, {name: 'Fintech', value: 5, imgSrc: constants.fintechImg, description: constants.fintechDescription}],
    [6, {name: 'Hardware', value: 6, imgSrc: constants.hardwareImg, description: constants.hardwareDescription}],
    [7, {name: 'Health', value: 7, imgSrc: constants.healthImg, description: constants.healthDescription}],
    [8, {name: 'Supply chain, logistics, & delivery', value: 8, imgSrc: constants.logisticsImg, description: constants.logisticsDescription}],
    [9, {name: 'Consumer & retail', value: 9, imgSrc: constants.retailImg, description: constants.retailDescription}],
    [10, {name: 'E-commerce & direct-to-consumer', value: 10, imgSrc: constants.ecommerceImg, description: constants.ecommerceDescription}],
    [11, {name: 'Travel', value: 11, imgSrc: constants.travelImg, description: constants.travelDescription}],
    [12, {name: 'Law Consultation', value: 12, imgSrc: constants.legalServicesImg, description: constants.legalServicesDescription}]
])

async function lockInIdea(ideaData) {
    return fetch('http://localhost:8080/lockInIdea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ideaData)
    })
      .then(data => data.json())
}

const IndustryRecommendation = () => {

    const {state} = useLocation();
    const [industry, setIndustry] = useState({name: 'Artificial intelligence', value: 1, imgSrc: constants.artificialIntelligenceImg});
    const [recommendedIndustry, setRecommendedIndustry] = useState();
    const [isLoading, setIsLoading] = useState(1);
    const [seeMoreOptions, setSeeMoreOptions] = useState(0);
    const emailAddress = state.emailAddress;
    const dummy = 'dummyIndustry';
    const [isPlatformIdea, setIsPlatformIdea] = useState(0);
    const navigate = useNavigate();

    const handleLockIn = async e => {
        var industryName = industry.name;
        if(industry.name === recommendedIndustry){
            setIsPlatformIdea(1);
        }
        e.preventDefault();
          await lockInIdea({
              emailAddress,
              industryName,
              isPlatformIdea
            });
            navigate('/entrepreneurDashboard', {state:{firstName: state.firstName, lastName: state.lastName, emailAddress:state.emailAddress, role: state.role}});
    }

    useEffect(() => {
        fetch('http://localhost:8080/getRecommendation',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailAddress, dummy})
        })
            .then(response => response.json())
            .then(data => {setIndustry(industriesMap.get(data));setRecommendedIndustry(industry.name); setIsLoading(0)})

    }, []);

    if (isLoading) {
        return <div>Loading</div>;
    }
    else if (seeMoreOptions){

    
        return(
            <div>
                <div>
                    <Navbar firstName={state.firstName} lastName={state.lastName} emailAddress={state.emailAddress} role={state.role}/>
                </div>

                <div class="py-16 bg-white">  
                    <div class="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
                        <div class="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-2">
                            <div class="bg-gray-200 rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 h-1/4 overflow-auto">
                                <div aria-label="group of cards" tabindex="0" class="focus:outline-none py-8 w-full">
                                    {
                                        industries.map((item) => (
                                            <div class="lg:flex items-center justify-center w-full mt-7">
                                                <div aria-label="card 3" tabindex="0" class="focus:outline-none lg:mb-0 mb-7 bg-white p-6 shadow rounded w-full">
                                                    <div class="items-center justify-center flex border-b border-gray-200 text-indigo-500 bg-orange-100 px-4 py-1 text-4xl rounded leading-loose font-semibold">
                                                        <button onClick={() => (setIndustry(item))}>
                                                            <span title="">
                                                                {item.name}
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div class="bg-gray-200 rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 h-1/4">
                                <div class="mb-4 flex flex-wrap justify-center">
                                    <img src={industry.imgSrc} class="max-w-full h-56 rounded-lg" alt=""/>
                                </div>
                                <div class="mb-12 space-y-4">
                                    <h3 class="text-2xl font-semibold text-indigo-500">{industry.name}</h3>
                                    <p class="mb-6 text-grey-500">{industry.description}</p>
                                    <button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl text-xl items-center gap-2" onClick={() => handleLockIn()}>
                                            <span>Lock in Idea</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        

        )
    }
    else{
        return(
            <div>
                <div>
                    <Navbar firstName={state.firstName} lastName={state.lastName} emailAddress={state.emailAddress} role={state.role}/>
                </div>

                <div class="py-16 bg-white">  
                    <div class="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
                        <div class="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-2">
                            <div class="bg-gray-200 rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 h-full overflow-auto">
                                <div aria-label="group of cards" tabindex="0" class="focus:outline-none w-full">
                                    <h3 class="text-3xl font-semibold text-indigo-500">BizConsult Idea Generator</h3>
                                    <div class="mb-12 space-y-4">
                                        <h3 class="text-2xl font-semibold text-black-200 flex ml-7 mt-2.5">Hello, {state.firstName}</h3>
                                        <p class="mb-6 text-grey-500">{constants.ideaGeneratorWelcomeMessage}</p>
                                        <p class="mb-6 text-grey-500">{constants.ideaGeneratorProcessMessage}</p>
                                        <p class="mb-6 text-grey-500">{constants.ideaGeneratorMoreOptionsMessage}</p>
                                        <button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 text-xl rounded-xl items-center gap-2" onClick={() => setSeeMoreOptions(1)}>
                                            <span>See More Options</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-200 rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 h-full">
                                <div class="mb-4 flex flex-wrap justify-center">
                                    <img src={industry.imgSrc} class="max-w-full h-56 rounded-lg" alt=""/>
                                </div>
                                <div class="mb-12 space-y-4">
                                    <h3 class="text-2xl font-semibold text-indigo-500">{industry.name}</h3>
                                    <p class="mb-6 text-grey-500">{industry.description}</p>
                                    <button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl text-xl items-center gap-2" onClick={() => handleLockIn()}>
                                            <span>Lock in Idea</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        

        )
    }
    

}

export default IndustryRecommendation;