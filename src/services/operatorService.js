import { URL_MASTER_DATA } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const getAllOperator = async () => {
    try {
        const response = await api.get(URL_MASTER_DATA.getOperator,  {
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

const insertOperator = async (requestBody) => {
    try {
        const response = await api.post(URL_MASTER_DATA.insertOperator, requestBody, {
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

const editOperator = async (requestBody) => {
    try {
        const response = await api.put(URL_MASTER_DATA.updateOperator, requestBody, {
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

const delOperators = async (id) => {
    try {
        const response = await api.put(URL_MASTER_DATA.delOperator+id, {
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

const OperatorService = {
    getAllOperator,
    insertOperator,
    editOperator,
    delOperators
};

export default OperatorService;