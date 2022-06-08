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
        <div className='flex items-center justify-center min-h-screen from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br'>
		<div className='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'>
			<div className='max-w-md mx-auto space-y-6'>

				<form action="">
					<h2 className="text-2xl font-bold ">Submit your application</h2>
					<p className="my-4 opacity-70">Adipisicing elit. Quibusdam magnam sed ipsam deleniti debitis laboriosam praesentium dolorum doloremque beata.</p>
					<hr className="my-6"/>
					<label className="uppercase text-sm font-bold opacity-70">Name</label>
					<input type="text" className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"/>
					<label className="uppercase text-sm font-bold opacity-70">Email</label>
					<input type="text" className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded"/>
					<label className="uppercase text-sm font-bold opacity-70">Language</label>
					<select className="w-full p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none">
						<option value="">Javascript</option>
						<option value="">Ruby</option>
						<option value="">Python</option>
						<option value="">PHP</option>
						<option value="">Java</option>
					</select>
					<div className="my-2 font-medium opacity-70">
						<input type="checkbox"/>
						Subscribe and follow company updates.
					</div>
					<input type="submit" className="py-3 px-6 my-2 bg-emerald-500 text-white font-medium rounded hover:bg-indigo-500 cursor-pointer ease-in-out duration-300" value="Send"/>
				</form>

			</div>
		</div>
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