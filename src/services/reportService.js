import { URL_API } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const getReportLkfs = async (requestBody) => {
    try {
        const response = await api.post(URL_API.reportsLkf, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const generateReportDaily = async (paramsBody) => {
    try {
        const response = await api.post(URL_API.reportsDaily, paramsBody, {
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

const reportHome = async (paramsBody) => {
    try {
        const response = await api.post(URL_API.exportHome, paramsBody, {
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

const reportLkf = async (paramsBody) => {
    try {
        const response = await api.post(URL_API.exportLkf,paramsBody, {
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

const reportLkfElipse = async (paramsBody) => {
    try {
        const response = await api.post(URL_API.exportLkfElipse, paramsBody, {
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

const uploadDatas = async (paramsBody) => {
    try {
        const token = localStorage.getItem('session_token')
        const response = await fetch(URL_API.uploadData, {
            method:'POST',
            body:paramsBody,
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'custom_token': token
            },
        });
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};


const reportService = {
    getReportLkfs,
    generateReportDaily,
    reportHome,
    reportLkf,
    reportLkfElipse,
    uploadDatas
};

export default reportService;