import { URL_API } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const getRequest = async () => {
    try {
        const response = await api.get(URL_API.tableReq,  {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const insertRequest = async (requestBody) => {
    try {
        const response = await api.post(URL_API.addData, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const summaryRequest = async (requestBody) => {
    try {
        const response = await api.patch(URL_API.summaryReq, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};


const sondingService = {
    getRequest,
    insertRequest,
    summaryRequest
};

export default sondingService;