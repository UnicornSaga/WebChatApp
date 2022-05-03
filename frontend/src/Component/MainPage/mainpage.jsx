import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import { Col, Container } from "react-bootstrap";
import Messages from '../Messages/Messages';
import MessageInput from '../MessageInput/MessageInput';
import Sidebar from "./sidebar";
import VideoCall from '../VideoCall/videoCall';
import { fetchUserInfo } from '../../services/UserInfo.service';
import "./mainpage.scss";
import messTitle from "../../Assets/mess.png";

const Main = () => {
    const { logout, getAccessTokenSilently, user } = useAuth0();
    const { email } = user;

    const [socket, setSocket] = useState(null);
    const [accessToken, setAccessToken] = useState();
    const [customer, setCustomer] = useState();
    const [destination, setDestination] = useState();

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:5000`, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax : 5000,
            reconnectionAttempts: 99999
        });
        setSocket(newSocket);
        newSocket.emit("takeID", { identity: email });
        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        (async () => {
            try {
              const token = await getAccessTokenSilently();
              setAccessToken(token);
              const data = await fetchUserInfo(email, token);
            setCustomer(data);
            console.log(data);
        } catch (e) {
            console.error(e);
          }
        })();
      }, [getAccessTokenSilently]);

    const renderFriend = async () => {
        const data = await fetchUserInfo(email, accessToken);
        setCustomer(data);
        console.log(data);
        return data;
    }
    
    return (
    
        <>
            <Sidebar logout={logout}>
                <Col className="inboxWrapper">
                    <img src ={messTitle} height = "80" width= "350"/>
                    {customer ? customer.friendlist.map((friend, id) => (
                        <div
                            onClick={() => {
                                setDestination(friend)
                                console.log(friend)
                            }}
                            className="inboxContainer"
                        >
                            {friend}
                            <hr />
                        </div>
                    )) : (
                        <div>
                            Loading...
                        </div>
                    )}
                </Col>

                <Col className="contentWrapper">
                    <Container fluid className="h-100 contentContainer">
                        <div className="main">
                            <div>
                                { socket ? (
                                    <div className='messageWrapper'>
                                        <div className='messageReceive'>
                                            <Messages socket={socket} />
                                        </div>

                                        <div className='inputForm'>
                                            <MessageInput socket={socket} identity={email} destination={destination}/>
                                        </div>
                                    </div>
                                ) : (
                                    <div>Not connected</div>
                                )}
                            </div>
                        </div>
                    </Container>
                </Col>
            </Sidebar>
        </>
    )
}

export default Main;