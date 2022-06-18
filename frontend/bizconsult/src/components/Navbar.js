import LoginButton from "./buttons/LoginButton";
import LogoutButton from "./buttons/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import logo from '../images/BizConsult-logo.png'
import * as constants from '../constants';


const Navbar = (props) => {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    if(isAuthenticated && props.userInfo !== null){
        if(props.role !== null && props.role === constants.ENTREPRENEUR_ROLE){
            return (
            <nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
                <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                    <div class="text-indigo-500 md:order-1">
                        <img className="img h-36 w-36 mb-0" src={logo}/>
                    </div>
                    <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
                        <ul class="flex font-semibold justify-between">
                            <li class="md:px-4 md:py-2 text-indigo-500"> 
                                <button  onClick={() => navigate("/industryRecommendation",
                                        {state:{firstName:props.firstName, lastName:props.lastName, emailAddress:props.emailAddress, role:props.role}})}>
                                        Idea generator
                                </button>
                            </li>
                            <li class="md:px-4 md:py-2 text-indigo-500"> 
                                <button  onClick={() => navigate("/entrepreneurDashboard",
                                        {state:{firstName:props.firstName, lastName:props.lastName, emailAddress:props.emailAddress, role:props.role}})}>
                                        Dashboard
                                </button>
                            </li>
                            <li class="md:px-4 md:py-2 text-indigo-500"> 
                                <button  onClick={() => navigate("/home",
                                            {state:{firstName:props.firstName, lastName:props.lastName, emailAddress:props.emailAddress, role:props.role}})}>
                                            Home
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="order-2 md:order-3">
                            <LogoutButton/>
                    </div>
                </div>
            </nav>
              
        )
        }
        else if(props.role !== null && props.role === constants.EXPERT_ADMIN_ROLE){
            return (
                <nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
                    <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                        <div class="text-indigo-500 md:order-1">
                            <img className="img h-36 w-36 mb-0" src={logo}/>
                        </div>
                        <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
                            <ul class="flex font-semibold justify-between">
                                <li class="md:px-4 md:py-2 text-indigo-500"> 
                                    <button  onClick={() => navigate("/expertDashboard",
                                            {state:{firstName:props.firstName, lastName:props.lastName, emailAddress:props.emailAddress, role:props.role}})}>
                                            Dashboard
                                    </button>
                                </li>
                                <li class="md:px-4 md:py-2 text-indigo-500"> 
                                    <button  onClick={() => navigate("/home",
                                                {state:{firstName:props.firstName, lastName:props.lastName, emailAddress:props.emailAddress, role:props.role}})}>
                                                Home
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="order-2 md:order-3">
                                <LogoutButton/>
                        </div>
                    </div>
                </nav>
            )
        }
        else{
            return (
                <nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
                    <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                        <div class="text-indigo-500 md:order-1">
                            <img className="img h-36 w-36 mb-0" src={logo}/>
                        </div>
                        <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
                            <ul class="flex font-semibold justify-between">
                                <li class="md:px-4 md:py-2 text-indigo-500"> 
                                    <button  onClick={() => navigate("/administratorDashboard",
                                                {state:{firstName:props.firstName, lastName:props.lastName, emailAddress:props.emailAddress, role:props.role}})}>
                                                Admin Dashboard
                                    </button>
                                </li>
                                <li class="md:px-4 md:py-2 text-indigo-500"> 
                                    <button  onClick={() => navigate("/home",
                                                {state:{firstName:props.firstName, lastName:props.lastName, emailAddress:props.emailAddress, role:props.role}})}>
                                                Home
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="order-2 md:order-3">
                                <LogoutButton/>
                        </div>
                    </div>
                </nav>
            ) 
        }
    }
    else{
        if (isAuthenticated && props.userInfo === null){
            return(
                <nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
                    <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                        <div class="text-indigo-500 md:order-1">
                            <img className="img h-36 w-36 mb-0" src={logo}/>
                        </div>
                        <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
                            <ul class="flex font-semibold justify-between">
                                <li class="md:px-4 md:py-2 text-indigo-500"> 
                                    <button  onClick={() => navigate("/home",
                                                {state:{firstName:props.firstName, lastName:props.lastName, email:props.email, role:props.role}})}>
                                                Home
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="order-2 md:order-3">
                                <LogoutButton/>
                        </div>
                    </div>
                </nav>
            )
        }
        else {
            return ( 
                <nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
                    <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                        <div class="text-indigo-500 md:order-1">
                            <img className="img h-36 w-36 mb-0" src={logo}/>
                        </div>
                        <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
                            <ul class="flex font-semibold justify-between">
                                <li class="md:px-4 md:py-2 text-indigo-500"> 
                                    <button  onClick={() => navigate("/home",
                                                {state:{firstName:props.firstName, lastName:props.lastName, email:props.email, role:props.role}})}>
                                                Home
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="order-2 md:order-3">
                                <LoginButton/>
                        </div>
                    </div>
                </nav>
            )
        }
    }
}
export default Navbar;