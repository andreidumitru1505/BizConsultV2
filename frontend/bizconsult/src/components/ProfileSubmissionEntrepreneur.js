import React, {useState} from 'react'
import ProfileSubmissionExpert from './ProfileSubmissionExpert';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from './Navbar';
import * as constants from "../constants";
import '../index.css'

async function register(profileData) {
    return fetch('http://localhost:8080/profileSubmission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    })
      .then(data => data.json())
   }
  
  const ProfileSubmissionEntrepreneur = () => {
  
    const {user} = useAuth0();

    const emailAddress = user.email;
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [studiesField, setStudiesField] = useState();
    const role = constants.ENTREPRENEUR_ROLE;
    const [changedRole, setChangedRole] = useState(null);
    const expertField = 'INVALID';
    const navigate = useNavigate();

    const handleSubmit = async e => {
      e.preventDefault();
        await register({
            firstName,
            lastName,
            age,
            gender,
            phoneNumber,
            studiesField,
            expertField,
            emailAddress,
            role
          });
          navigate('/home', {state:{firstName: firstName, lastName: lastName, emailAddress:emailAddress, role: role}});
  }

  if(changedRole == null){
    return (
<div className="max-w-2xl mx-auto bg-white p-16">

<form>
<div className="grid gap-6 mb-6 lg:grid-cols-2">
    <div>
        <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
    </div>
    <div>
        <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
        <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required/>
    </div>
    <div>
        <label for="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Company</label>
        <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required/>
    </div>  
    <div>
        <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
        <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
    </div>
    <div>
        <label for="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Website URL</label>
        <input type="url" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required/>
    </div>
    <div>
        <label for="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Unique visitors (per month)</label>
        <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required/>
    </div>
</div>
<div className="mb-6">
    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required/>
</div> 
<div className="mb-6">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required/>
</div> 
<div className="mb-6">
    <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm password</label>
    <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required/>
</div> 
<div className="flex items-start mb-6">
    <div className="flex items-center h-5">
    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
    </div>
    <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
</div>
<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

<p className="mt-5">These input field components is part of a larger, open-source library of Tailwind CSS components. Learn
    more by going to the official <a className="text-blue-600 hover:underline"
        href="https://flowbite.com/docs/getting-started/introduction/" target="_blank">Flowbite
        Documentation</a>.
</p>
</div>
    )
  }
  else{
    return (
        <div>
            <ProfileSubmissionExpert/>
        </div>);
  }
}

export default ProfileSubmissionEntrepreneur;