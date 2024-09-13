import { URL_MASTER_DATA } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const getElipses = async () => {
    try {
        const response = await api.get(URL_MASTER_DATA.getMDElipse, {
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

const insertElipses = async (requestBody) => {
    try {
        const response = await api.post(URL_MASTER_DATA.insertMDElipse, requestBody, {
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

const updateElipses = async (requestBody) => {
    try {
        const response = await api.patch(URL_MASTER_DATA.updateMDElipse, requestBody, {
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

const delElipses = async (id) => {
    try {
        const response = await api.patch(URL_MASTER_DATA.delMDElipse+id, {
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

const masterElipseService = {
    getElipses,
    insertElipses,
    updateElipses,
    delElipses
};

export default masterElipseService;