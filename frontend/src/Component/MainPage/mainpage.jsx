import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';
import MessageInput from '../MessageInput/MessageInput';
import { fetchUserInfo } from '../../services/UserInfo.service';
import { useNavigate } from 'react-router-dom';
import "./mainpage.scss";

import './sidebar.jsx'

const Main = () => {
    const { logout, getAccessTokenSilently, user } = useAuth0();
    const { email } = user;

    const [socket, setSocket] = useState(null);
    const [accessToken, setAccessToken] = useState();
    const [customer, setCustomer] = useState();
    
    const navigate = useNavigate();

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:5000`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        (async () => {
            try {
              const token = await getAccessTokenSilently();
              console.log(token);
              const data = await fetchUserInfo(email, token);
              console.log(data);
              setCustomer(data);
          } catch (e) {
            console.error(e);
          }
        })();
      }, [getAccessTokenSilently]);

    return (
        <html>
            <body>

                <div class="sidenav">
                    <button href="#home">Home</button>
                    <button href="#search">Search</button>
                    
                    
                   <footer>
                   <button href = "#setting"
                                onClick={() => {
                                    navigate("/settings")
                                }}
                            >
                                Setting
                    </button>
                   </footer>
                        
                </div>

                <div class="main">
                    <div>
                            Hello world
                            <button
                                onClick={() => logout({
                                    returnTo: window.location.origin,
                                })}
                            >
                            Logout
                        </button>
                        <div>
                            { socket ? (
                                <div>
                                    <Messages socket={socket} />
                                    <MessageInput socket={socket} identity={email} />
                                </div>
                            ) : (
                                <div>Not connected</div>
                            )}
                        </div>
                    </div>
                </div>

            </body>
        </html>
    )
}

export default Main;