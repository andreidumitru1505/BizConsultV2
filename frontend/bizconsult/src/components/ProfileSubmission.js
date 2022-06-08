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
                    <div className="card shadow mb-4 mx-auto text-center" style ={{  width: '22rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#BEEDAA',borderRadius:"10px"}}>               
                        <div className="card-body">
                            <h4 className="card-title mb-0 border-bottom font-weight-bold" > Setup your profile</h4>
                        </div>  
                        <div className='form-group'  style={{marginInline:"2.5rem", marginBottom:"8%"}}>
                            <label>Profile Type</label>                  
                            <select class="form-select" style ={{borderRadius:"10px"}}onChange={e => setRole(e.target.value)}>
                                <option selected>Profile type</option>
                                <option value={constants.EXPERT_ADMIN_ROLE}>Expert</option>
                                <option value={constants.ENTREPRENEUR_ROLE}>Entrepreneur</option>
                            </select>
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