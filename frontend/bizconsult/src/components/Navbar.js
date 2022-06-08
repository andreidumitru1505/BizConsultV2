import LoginButton from "./buttons/LoginButton";
import LogoutButton from "./buttons/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.png'
import * as constants from '../constants';


const Navbar = (props) => {
    const { isAuthenticated } = useAuth0();

    if(isAuthenticated && props.userInfo !== null){
        if(props.role !== null && props.role === constants.ENTREPRENEUR_ROLE){
            return (
                <nav className="navbar" >
                    <div style={{display:'flex', flex:'1', alignItems:'flex-start'}}>   
                        <img className="img" src={logo} style ={{maxWidth:'8rem', marginTop:'0rem'}} />
                    </div>
                    <LogoutButton></LogoutButton>
                </nav>)
        }
        else if(props.role !== null && props.role === constants.EXPERT_ADMIN_ROLE){
            return (
                <nav className="navbar" >
                    <div style={{display:'flex', flex:'1', alignItems:'flex-start'}}>   
                        <img className="img" src={logo} style ={{maxWidth:'8rem', marginTop:'0rem'}} />
                    </div>
                    <LogoutButton></LogoutButton>
                </nav>)
        }
        else{
            return (
                <nav className="navbar" >
                    <div style={{display:'flex', flex:'1', alignItems:'flex-start'}}>   
                        <img className="img" src={logo} style ={{maxWidth:'8rem', marginTop:'0rem'}} />
                    </div>
                    <LogoutButton></LogoutButton>
                </nav>) 
        }
    }
    else{
        if (isAuthenticated && props.userInfo === null){
            return(
            <>
                <nav className="navbar" >
                    <div style={{display:'flex', flex:'1', alignItems:'flex-start'}}>     
                    <img className="img" src={logo} style ={{maxWidth:'8rem', marginTop:'0rem'}} /> </div>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
                        <LogoutButton></LogoutButton>
                    </div>
                </nav>
            </>
            )
        }
        else {
            return ( 
                <>
                    <nav className="navbar" >
                        <div style={{display:'flex', flex:'1', alignItems:'flex-start'}}>     
                        <img className="img" src={logo} style ={{maxWidth:'8rem', marginTop:'0rem'}} /> </div>
                        <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
                            <LoginButton></LoginButton>
                        </div>
                    </nav>
                </>
        
            )
        }
    }
}
export default Navbar;