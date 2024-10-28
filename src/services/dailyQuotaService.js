import { URL_API } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const getData = async (opt) => {
    try {
        const response = await api.post(URL_API.getQuota, opt, {
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

const insertData = async () => {
    try {
        const response = await api.get(URL_API.insetQuota, {
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

const updateData = async (data) => {
    try {
        const response = await api.put(URL_API.updateQuota, data,{
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

const getActiveData = async (tanggal) => {
    try {
        const response = await api.get(URL_API.getActiveQuota+tanggal, {
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

const disableBusQuo = async (requestBody) => {
    try {
        const response = await api.put(URL_API.disableBus, requestBody, {
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

const disableLvQuo = async (requestBody) => {
    try {
        const response = await api.put(URL_API.disableLv, requestBody, {
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

const disableHlvQuo = async (requestBody) => {
    try {
        const response = await api.put(URL_API.disableHlv, requestBody, {
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

const dailyQuotaService = {
    getData,
    insertData,
    updateData,
    getActiveData,
    disableBusQuo,
    disableLvQuo,
    disableHlvQuo
};

export default dailyQuotaService;