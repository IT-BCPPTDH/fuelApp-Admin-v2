import { URL_API } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const summaryForm = async (requestBody) => {
    try {
        const response = await api.get(URL_API.formDashboard+requestBody, {
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

const tableForm = async (requestBody) => {
    try {
        const response = await api.get(URL_API.formTable+requestBody, {
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


const insertData = async (requestBody) => {
    try {
        const response = await api.post(URL_API.addTransaction, requestBody, {
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

const formService = {
    summaryForm,
    tableForm,
    insertData
};

export default formService;
