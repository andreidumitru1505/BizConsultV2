import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
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

async function post(requestData) {
    return fetch('http://localhost:8080/getRecommendation',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }).then(data => data.json())

}

const IndustryRecommendation = () => {

    const {state} = useLocation();
    const [industry, setIndustry] = useState({name: 'Artificial intelligence', value: 1, imgSrc: constants.artificialIntelligenceImg});

    const handleSubmit = async e => {
        e.preventDefault();

        try {

            await post({
                emailAddress: state.emailAddress
            });
        } catch (e) {
        }
        

    }

    return(
        <div>
            <div>
                <Navbar firstName={state.firstName} lastName={state.lastName} emailAddress={state.emailAddress} role={state.role}/>
            </div>

            <div class="py-16 bg-purple-200">  
    <div class="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
        <div class="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-2">
            <div class="bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 h-1/4 overflow-auto">
                <div aria-label="group of cards" tabindex="0" class="focus:outline-none py-8 w-full">
                    {
                        industries.map((item) => (
                            <div class="lg:flex items-center justify-center w-full mt-7">
                                <div aria-label="card 3" tabindex="0" class="focus:outline-none lg:mb-0 mb-7 bg-white p-6 shadow rounded w-full">
                                    <div class="items-center justify-center flex border-b border-gray-200 text-white bg-orange-500 px-4 py-1 text-4xl rounded leading-loose font-semibold">
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
            <div class="bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 h-1/4">
                <div class="mb-4 flex flex-wrap justify-center">
                    <img src={industry.imgSrc} class="max-w-full h-56 rounded-lg" alt=""/>
                </div>
                <div class="mb-12 space-y-4">
                    <h3 class="text-2xl font-semibold text-purple-900">{industry.name}</h3>
                    <p class="mb-6">{industry.description}</p>
                    <a href="#" class="block font-medium text-purple-600">Know more</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="flex justify-center w-screen h-screen px-4 text-gray-700">
	<div class="flex w-full max-w-screen-lg">
		<div class="flex flex-col flex-grow border-l border-r border-gray-300">
			<div class="flex-grow h-0 overflow-auto">
				<div class="flex w-full p-8 border-b border-gray-300">
					<span class="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
					<div class="flex flex-col flex-grow ml-4">
						<div class="flex">
							<span class="font-semibold">Username</span>
							<span class="ml-1">@username</span>
							<span class="ml-auto text-sm">Just now</span>
						</div>
						<p class="mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <a class="underline" href="#">#hashtag</a></p>
						<div class="flex items-center justify-center h-64 mt-2 bg-gray-200">
							<span class="font-semibold text-gray-500">Image</span>
						</div>
						<div class="flex mt-2">
							<button class="text-sm font-semibold">Like</button>
							<button class="ml-2 text-sm font-semibold">Reply</button>
							<button class="ml-2 text-sm font-semibold">Share</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
        </div>
      

    )

    

}

export default IndustryRecommendation;