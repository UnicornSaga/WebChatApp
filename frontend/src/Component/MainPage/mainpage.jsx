import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';
import MessageInput from '../MessageInput/MessageInput';
import { fetchUserInfo } from '../../services/UserInfo.service';
import { useNavigate } from 'react-router-dom';
import "./mainpage.scss";

import homeIcon from "../../Assets/house.png";
import settingIcon from "../../Assets/setting.png";
import searchIcon from "../../Assets/search.png";
import AppIcon from "../../Assets/AppIcon.png";
import logoutIcon from "../../Assets/logout.png";
import messTitle from "../../Assets/mess.png";
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
                    <img src ={AppIcon}height = "100" width= "100"/>
                    <button href="#home"><img src ={homeIcon} height = "40" width= "40"/></button> 
                    <button href="#search"><img src ={searchIcon} height = "40" width= "40"/></button>
                    <button href = "#setting"
                                onClick={() => {
                                    navigate("/settings")
                                }}
                            >
                                <img src ={settingIcon} height = "40" width= "40"/>
                    </button>
                   <footer>
                        <button
                                onClick={() => logout({
                                    returnTo: window.location.origin,
                                })}
                            >
                            <img src ={logoutIcon} height = "40" width= "40"/>
                        </button>
                   </footer>
                        
                </div>

                <div class="main">

                <div class="sidenav_beside">
                    <a>...</a>
                    <a class="title_text>">Messages </a>
                    <img src ={messTitle}height = "70" width= "350"/>
                    <footer></footer> 
                </div>

                <div class="message_box">

                <a href = "#title">Message </a>
                                        
                </div>
                    <div>
                            Hello world
                        
                            <div>
                                { socket ? (
                                    <div>
                                        <footer class="main">
                                            <Messages socket={socket} />
                                            <MessageInput socket={socket} identity={email} />
                                        </footer>
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