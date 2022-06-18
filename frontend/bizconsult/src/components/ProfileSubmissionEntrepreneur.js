import React, {useState} from 'react'
import ProfileSubmissionExpert from './ProfileSubmissionExpert';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from './Navbar';
import * as constants from "../constants";
import '../index.css'

const scienceEngineeringString = 'Science & Engineering';

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
    const [gender, setGender] = useState('MALE');
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
        <div>
            <Navbar userInfo={null}/>
            <h2 class="text-4xl font-bold mt-5">Set up your profile</h2>
            <div className="max-w-2xl mx-auto bg-white p-16">
                <div className="border-2">
                    <div className='m-10'>
                        <label class="uppercase text-sm font-bold opacity-70">Your Role</label>
                        <select class="w-full p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none" defaultValue={'Entrepreneur'} onChange={() => setChangedRole('changed')}>
                            <option value="">Entrepreneur</option>
                            <option value="">Expert</option>
                        </select>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                <div>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required onChange={e => setFirstName(e.target.value)}/>
                                </div>
                                <div>
                                    <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                                    <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required onChange={e => setLastName(e.target.value)}/>
                                </div>
                                <div>
                                    <label for="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Age</label>
                                    <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="18" required onChange={e => setAge(e.target.value)}/>
                                </div>
                                <div>
                                <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gender</label>
                                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => setGender(e.target.value)}>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="NOT_SPECIFIED">Prefer not to say</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                                    <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" required onChange={e => setPhoneNumber(e.target.value)}/>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label for="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Studies</label>
                                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => setStudiesField(e.target.value)}>
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
                            <button type="submit" className="text-white mb-6 bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
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