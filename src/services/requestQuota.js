import { URL_API } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const getRequest = async (requestBody) => {
    try {
        const response = await api.post(URL_API.tableReq, requestBody, {
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
        const response = await api.get(URL_API.summaryReq+requestBody, {
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


const requestService = {
    getRequest,
    insertRequest,
    summaryRequest
};

export default requestService;