import React, {useState} from 'react'
import Navbar from './Navbar';
import ProfileSubmissionEntrepreneur from './ProfileSubmissionEntrepreneur';
import ProfileSubmissionExpert from './ProfileSubmissionExpert';
import * as constants from "../constants";

const ProfileSubmission = () => {

  const [role, setRole] = useState(null);

    if (role == null){
        return (
                <div>
                    <Navbar userInfo={null} />    
                    <h2 class="text-4xl font-bold font-serif mt-5">Set up your profile</h2>
                    <div className="max-w-2xl mx-auto bg-white p-16">
                        <div className="border-2">
                            <div class="m-10">
                                <label class="uppercase text-sm font-bold opacity-70 pb-5">Your Role</label>
                                <select class="w-full p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none" defaultValue={'Expert'} onChange={e => setRole(e.target.value)}>
                                    <option value="">Expert</option>
                                    <option value="">Entrepreneur</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>            
        );
    }
    else if(role === constants.ENTREPRENEUR_ROLE) {
        return <ProfileSubmissionEntrepreneur/>;
    }
    else{
        return <ProfileSubmissionExpert/>;
    }
};

export default ProfileSubmission;