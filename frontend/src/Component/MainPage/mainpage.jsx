import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';
import MessageInput from '../MessageInput/MessageInput';

const Main = () => {
    const { logout, getAccessTokenSilently } = useAuth0();

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:5000`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    /* useEffect(() => {
        (async () => {
            try {
              const token = await getAccessTokenSilently();
              console.log(token);
          } catch (e) {
            console.error(e);
          }
        })();
      }, [getAccessTokenSilently]); */

    return (
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
                        <MessageInput socket={socket} />
                    </div>
                ) : (
                    <div>Not connected</div>
                )}
            </div>
        </div>
    )
}

export default Main;