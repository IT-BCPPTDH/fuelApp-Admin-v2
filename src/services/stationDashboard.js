import { URL_API, URL_MASTER_DATA } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const summaryStation = async (requestBody) => {
    try {
        const response = await api.post(URL_API.stationHome, requestBody, {
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

const tableStation = async (requestBody) => {
    try {
        const response = await api.post(URL_API.stationTable, requestBody, {
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

const editTrxStation = async (requestBody) => {
    try {
        const response = await api.put(URL_API.editStation, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
        return true
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const delTrxStation = async (paramsBody) => {
    try {
        const response = await api.put(URL_API.delStation + paramsBody, {
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

const addTrxStation = async (requestBody) => {
    try {
        const response = await api.post(URL_API.addTrxStations, requestBody, {
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

const getStation = async () => {
    try {
        const response = await api.get(URL_MASTER_DATA.getAllStation,  {
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

const insertStation = async (requestBody) => {
    try {
        const response = await api.post(URL_MASTER_DATA.insertStation, requestBody, {
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

const updateStation = async (requestBody) => {
    try {
        const response = await api.patch(URL_MASTER_DATA.updateStation, requestBody, {
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

const delStation = async (id) => {
    try {
        const response = await api.patch(URL_MASTER_DATA.delStation+id, {
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

const stationService = {
    summaryStation,
    tableStation,
    getStation,
    insertStation,
    updateStation,
    delStation,
    editTrxStation,
    delTrxStation,
    addTrxStation
};

export default stationService;
