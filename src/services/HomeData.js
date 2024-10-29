import { URL_API } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const summaryDashboard = async (requestBody) => {
    try {
        const response = await api.post(URL_API.summaryHome, requestBody, {
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

const tableDashboard = async (requestBody) => {
    try {
        const response = await api.post(URL_API.tableHome, requestBody, {
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


const getDataPrevTR = async (unitNo) => {
    console.log('Fetching previous unit transaction for:', unitNo);
    try {
        const response = await api.get(`${URL_API.getUnitPrev}${unitNo}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch unit data. Status: ${response.status} ${response.statusText}`);
        }

        console.log('Successfully fetched previous unit data:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Error fetching data:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
        }
        throw error; // Rethrow the error for further handling
    }
};


const MainService = {
    summaryDashboard,
    tableDashboard,
    getDataPrevTR,
};

export default MainService;
