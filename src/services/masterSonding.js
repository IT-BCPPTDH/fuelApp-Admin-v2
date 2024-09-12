import { URL_MASTER_DATA } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const getSonding = async () => {
    try {
        const response = await api.get(URL_MASTER_DATA.getMDSonding,  {
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

const insertSonding = async (requestBody) => {
    try {
        const response = await api.post(URL_MASTER_DATA.insertMDSonding, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const updateSonding = async (requestBody) => {
    try {
        const response = await api.patch(URL_MASTER_DATA.updateMDSonding, requestBody, {
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

const delSonding = async (id) => {
    try {
        const response = await api.patch(URL_MASTER_DATA.delMDSonding+id, {
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
    getSonding,
    insertSonding,
    updateSonding,
    delSonding
};

export default sondingService;