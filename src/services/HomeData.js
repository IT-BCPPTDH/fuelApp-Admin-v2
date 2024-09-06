import { URL_API } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const postData = async (requestBody) => {
    try {
        const response = await api.post(URL_API.postHome, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Return the response data
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const MainService = {
   postData
};

export default MainService;
