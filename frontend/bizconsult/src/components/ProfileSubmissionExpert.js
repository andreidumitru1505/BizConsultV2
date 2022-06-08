import React, {useState} from 'react'
import ProfileSubmissionEntrepreneur from './ProfileSubmissionEntrepreneur';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from './Navbar';
import * as constants from "../constants";

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
  
  const ProfileSubmissionExpert = () => {
  
    const {user} = useAuth0();

    const emailAddress = user.email;
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const age= 'INVALID';
    const gender = 'INVALID';
    const phoneNumber = 'INVALID';
    const studiesField = 'INVALID';
    const role = constants.EXPERT_ADMIN_ROLE;
    const [changedRole, setChangedRole] = useState(null);
    const [expertField, setExpertField] = useState();
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
            <div class = "container" style ={{ width: '100%'}}>
                <div  style ={{width: '32%', marginLeft: '34%', marginRight: '34%'}}> 
                
                    <div className="card shadow mb-4 mx-auto text-center" style ={{ marginTop: '5%', backgroundColor: '#BEEDAA',borderRadius:"10px"}}>   
                        <div className="card-body">
                            <h4 class="card-title mb-0 border-bottom font-weight-bold" style ={{position: 'relative', top: '10px', left: '16.5%', right: '16.5%', fontSize: '3em'}}> Set up your profile </h4>
                        </div>
                        <div>
                            <select style ={{borderRadius:"10px", position: 'relative', left:'10%', height: '40px', width: '100px',fontSize: '15px', textAlign: 'center'}} id="inputState" class="form-select" defaultValue={"Expert"} onChange={() => { setChangedRole("changed") }}>
                                <option style={{fontSize: '15px'}}>Expert</option>
                                <option style={{fontSize: '15px'}}>Entrepreneur</option>
                            </select>
                        </div>
                        <form className='form-group' style={{position: 'relative', left:'10%'}} onSubmit={handleSubmit} >
                            <p></p>
                            <input style ={{borderRadius:"10px", height: '40px', fontSize: '15px', width: '200px'}} type="text" class="form-control" id="3" placeholder="First Name" onChange={e => setFirstName(e.target.value)}/>
                            <p></p>
                            <input style ={{borderRadius:"10px", height: '40px', fontSize: '15px', width: '200px'}} type="text" class="form-control" id="3" placeholder="Last Name" onChange={e => setLastName(e.target.value)}/>
                            <p></p>
                            <div style ={{height: '10px', position: 'relative', left: '5%'}}>
                                <input style ={{borderRadius:"10px", position: 'relative', width: '200px', height: '100px', bottom:'1220%',left: '40%', fontSize:'15px'}} type="text" class="form-control" id="3" placeholder="Expertise" onChange={e => setExpertField(e.target.value)}/>
                            </div>

                            <button class="btn btn-primary"  style ={{position: 'relative', marginBottom: '5%', width: '150px', height: '40px', left: '27%' ,backgroundColor:"#94AE89", borderColor:"#94AE89", fontFamily:"Quicksand", fontSize: '15px',fontWeight:"bold", borderRadius:"5px", padding:"4px"}}>Submit</button> 
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
            <ProfileSubmissionEntrepreneur/>
        </div>);
  }
}

export default ProfileSubmissionExpert;