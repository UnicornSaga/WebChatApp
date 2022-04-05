import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./Login.scss";
import LoginImg from "../../Assets/gojo.jpg";
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { loginWithRedirect, isAuthenticated, logout, user, getAccessTokenSilently } = useAuth0();
    
    useEffect(() => {
        (async () => {
          try {
            const token = await getAccessTokenSilently();
            console.log(token);
          } catch (e) {
            console.error(e);
          }
        })();
      }, [getAccessTokenSilently]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="hideImg">
                        <img src={LoginImg} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="formContainer">
                        <div className="logo">
                            <img src={LoginImg} height="60px" width="60px" />
                        </div>
                        <h2>Login to your account</h2>
                        <p>See what is going on in the crypto market</p>
                        <button
                            onClick={() => loginWithRedirect()}
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
        </div>
    )
}

export default Login;