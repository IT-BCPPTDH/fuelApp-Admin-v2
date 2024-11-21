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


const getDataPrevTR = async (unitNo, date) => {
    try {
        const response = await api.get(`${URL_API.getUnitPrev}${unitNo}/${date}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};


const MainService = {
    summaryDashboard,
    tableDashboard,
    getDataPrevTR,
};

export default MainService;
