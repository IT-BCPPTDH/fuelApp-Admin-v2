import { URL_USER_API } from "../utils/Enums";

const authLogin = async (requestBody) => {
    try {
        const response = await fetch(URL_USER_API.Auth, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });        

          return await response.json();

    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const logout = async (requestBody) => {
    try {
        const response = await fetch(URL_USER_API.Logout, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
        return await response.json();

    } catch (error) {
        console.log(error)
    }
}

const UserService = {
    authLogin,
    logout
};

export default UserService;  