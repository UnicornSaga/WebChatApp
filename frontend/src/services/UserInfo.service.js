import axios from "axios";
import UserInfo from "../data/UserInfo.class";

export async function fetchUserInfo(email, token) {
    const userInfo = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_BASE_URL}/users/${email}/`,
        headers: { authorization: `Bearer ${token}` }
    })
        .then((res) => {
            const d = res.data;
            return new UserInfo(
                d.email,
                d.name, 
                d.description,
                d.age,
            )
        })
        .catch((error) => {
            console.error(error);
        })
        
    console.log(userInfo);
    return userInfo;
}


async function createNewUser(email, token) {
    return await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_BASE_URL}/users/`,
        headers: { authorization: `Bearer ${token}` },
        data: {
            email,
        }
    })
        .then((res) => {
            const d = res.data;
            return new UserInfo(
                d.email,
                d.name,
                d.description,
                d.age
            )
        })
        .catch((error) => {
            console.error(error);
        })
}
