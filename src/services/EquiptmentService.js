import { URL_MASTER_DATA } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const getEquip = async () => {
    try {
        const response = await api.get(URL_MASTER_DATA.getMDEquip, {
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

const insertEquip = async (requestBody) => {
    try {
        const response = await api.post(URL_MASTER_DATA.insertEquip, requestBody, {
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

const updateEquip = async (requestBody) => {
    try {
        const response = await api.patch(URL_MASTER_DATA.updateEquip, requestBody, {
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

const delEquip = async (id) => {
    try {
        const response = await api.patch(URL_MASTER_DATA.delMDEquip+id, {
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

const EquipService = {
    getEquip,
    insertEquip,
    updateEquip,
    delEquip
};

export default EquipService;