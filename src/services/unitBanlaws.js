import { URL_MASTER_DATA } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const getUnitBanlaws = async () => {
    try {
        const response = await api.get(URL_MASTER_DATA.getAllBanlaws,  {
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

const insertUnitBanlaws = async (requestBody) => {
    try {
        const response = await api.post(URL_MASTER_DATA.insertBanlaws, requestBody, {
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

const updateUnitBanlaws = async (requestBody) => {
    try {
        const response = await api.patch(URL_MASTER_DATA.updateBanlaws, requestBody, {
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

const delUnitBanlaws = async (id) => {
    try {
        const response = await api.patch(URL_MASTER_DATA.delBanlaws+id, {
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

const UnitBanlawsService = {
    getUnitBanlaws,
    insertUnitBanlaws,
    updateUnitBanlaws,
    delUnitBanlaws
};

export default UnitBanlawsService;