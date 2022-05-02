import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';
import MessageInput from '../MessageInput/MessageInput';
import { fetchUserInfo } from '../../services/UserInfo.service';
import "./mainpage.scss";
import messTitle from "../../Assets/mess.png";
import Sidebar from "./sidebar";

const Main = () => {
    const { logout, getAccessTokenSilently, user } = useAuth0();
    const { email } = user;

    const [socket, setSocket] = useState(null);
    const [accessToken, setAccessToken] = useState();
    const [customer, setCustomer] = useState();

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
            <Sidebar logout={logout} />
                

                <div class="main">

                <div class="sidenav_beside">
                    <img src ={messTitle}height = "80" width= "350"/>
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