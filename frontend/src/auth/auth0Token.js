

async function refreshAccessToken(token) {
    try {
        const url = "https://dev-bvk0xx2k.us.auth0.com/oauth/token";
        const response = await fetch(url, {
            body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
                client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,

            })
        })
    }
}


async funtion getAccessToken() {
    try {
        const url = "https://dev-bvk0xx2k.us.auth0.com/oauth/token";
        const response = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "password",
                username: ,
                password: ,
                scope: "openid profile email offline_access",
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
                client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET
            })
        })
    }
}