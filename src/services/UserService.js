import { URL_USER_API } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});


const authLogin = async (requestBody) => {
    try {
        const response = await fetch(URL_USER_API.Auth, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        // Check if the response status is OK (status code 200-299)
        if (!response.ok) {
            // Log the response status and text for debugging
            const errorText = await response.text(); // Read text from the response
            console.error(`HTTP Error ${response.status}: ${errorText}`);
            throw new Error(`HTTP Error ${response.status}: ${errorText}`);
        }

        // Check if the response content type is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            // Parse the response as JSON
            return await response.json();
        } else {
            // Handle unexpected content types
            console.error('Unexpected content type:', contentType);
            throw new Error('Unexpected content type');
        }
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


const getAllUser = async (requestBody) => {
    try {
        const response = await fetch(URL_USER_API.getallUser, {
            method: 'GET',
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


const updateMasterDataUser = async (data) =>{
    try {
        const response = await api.patch(URL_USER_API.updateUser,data)
        console.log("data response", response.data);
        return response.data;

    } catch (error) {
        console.error("Error updating", error);
        throw error;
    }
}

const getAllRoles = async (requestBody) => {
    try {
        const response = await fetch(URL_USER_API.getAllRoles, {
            method: 'GET',
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
    logout,
    getAllUser,
    updateMasterDataUser,
    getAllRoles
};

export default UserService;  