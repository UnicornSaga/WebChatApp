import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Main = () => {
    const { logout } = useAuth0();

    return (
        <div>
            Hello world
        </div>
    )
}

export default Main;