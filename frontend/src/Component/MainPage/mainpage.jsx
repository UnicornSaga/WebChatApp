import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import Popup from 'reactjs-popup';
import { Col, Container, Button } from "react-bootstrap";
import Messages from '../Messages/Messages';
import MessageInput from '../MessageInput/MessageInput';
import Sidebar from "./sidebar";
import VideoCall from '../VideoCall/videoCall';
import { fetchUserInfo, updateUserInfo } from '../../services/UserInfo.service';
import "./mainpage.scss";
import messTitle from "../../Assets/mess.png";
import minus from "../../Assets/minus.png";
import OnlineStatus from "../../Assets/online.png";

const Main = () => {
    const { logout, getAccessTokenSilently, user } = useAuth0();
    const { email } = user;

    const [socket, setSocket] = useState(null);
    const [accessToken, setAccessToken] = useState();
    const [customer, setCustomer] = useState();
    const [destination, setDestination] = useState(null);
    const [newFriend, setNewFriend] = useState();
    const [messageRender, setMessageRender] = useState(new Map());
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:5000`, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax : 5000,
            reconnectionAttempts: 99999
        });
        setSocket(newSocket);
        newSocket.emit("takeID", { identity: email })
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

    const addFriend = async () => {
        const tmp = customer;
        tmp.friendlist.push(newFriend);
        await updateUserInfo(tmp, accessToken);
        setCustomer(tmp);
        setNewFriend("");
    }

    const deleteFriend = async (friend) => {
        const tmp = customer;
        tmp.friendlist.splice(tmp.friendlist.indexOf(friend), 1);
        await updateUserInfo(tmp, accessToken);
        setCustomer(tmp);
    }

    const renderFriendlist = () => {
        if (customer.friendlist.length !== 0) {
            return (
                customer.friendlist.map((friend) => (
                    <div
                        onClick={() => {
                            setDestination(friend)
                            
                        }}
                        className="inboxContainer"
                    >
                        {friend}
                        <img src={minus} height = '20' width="20" onClick={async () => await deleteFriend(friend)}/>
                        <hr />
                    </div>
                    )
                )
            )
        }
        return (
            <div>
                NO FRIEND
            </div>
        )
    }

    
    return (
    
        <>
            <Sidebar logout={logout}>
                <Col className="inboxWrapper">
                    <Popup trigger={
                        <img src ={messTitle} height = "80" width= "350"/>
                    }
                    >
                        <input 
                            className='form-control'
                            onChange={(e) => {
                                setNewFriend(e.currentTarget.value)
                            }}
                        />
                        <Button onClick={async () => await addFriend()}>Add Friend</Button>
                    </Popup>
                    {customer ? renderFriendlist() : (
                        <div>
                            Loading...
                        </div>
                    )}
                </Col>

                <Col className="contentWrapper">
                    <Container fluid className="h-100 contentContainer">
                        <div className="main">
                            <div>
                                { socket && destination ? (
                                    <div className='messageWrapper'>
                                        <div>
                                            {destination}
                                        </div>
                                        <hr />

                                        <div className='messageReceive'>
                                            <Messages socket={socket} email={email} from={destination} messages={messages} setMessages={setMessages} />
                                        </div>
                    
                                        <div className='inputForm'>
                                            <MessageInput socket={socket} identity={email} destination={destination}/>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
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