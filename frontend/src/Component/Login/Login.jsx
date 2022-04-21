import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./Login.scss";
import LoginImg1 from "../../Assets/upperImg.png";
import LoginImg2 from "../../Assets/lowerImg.png";
import LoginImg3 from "../../Assets/pngwing.png";
import LoginImg4 from "../../Assets/pngwing1.png";
import LoginImg5 from "../../Assets/heart.png";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
    if (!isAuthenticated) return;
    return navigate("/main");
    }, [isAuthenticated])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className='col-md-6'>
                        <div className="imgContainer">
                            <div className='childrenImg1'>
                                <img src={LoginImg1}/>
                            </div>
                            <div className='childrenImg2'>
                                <img src={LoginImg2}/>
                            </div>
                            <div className='childrenImg3'>
                                <img src={LoginImg5}/>
                                <img src={LoginImg3}/>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className="formContainer">
                            <div className="logo">
                                <img src={LoginImg4} height="60px" width="60px" />
                            </div>
                            <h2>Login to your account</h2>
                            <p>Connect to your friends and family from across the globe!</p>
                            <button
                                onClick={(e) => { e.preventDefault(); loginWithRedirect() }}
                            >
                                Start Loging In
                            </button>
                            {isAuthenticated && <button
                                onClick={() => logout({
                                    returnTo: window.location.origin,
                                })}
                            >
                                Logout
                            </button>}
                        </div>
                    </div>
                </div>

                <footer>
                    <div>
                        <p>This projects belongs to Group 6</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Login;