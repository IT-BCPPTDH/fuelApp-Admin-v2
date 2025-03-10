import { URL_API } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
  maxBodyLength: Infinity
});

const bulkStation = async (paramsBody) => {
    try {
        const response = await fetch(URL_API.bulkStation, {
            method:'POST',
            body:paramsBody,
        });
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const bulkSonding = async (paramsBody) => {
    try {
        const response = await fetch(URL_API.bulkSonding, {
            method:'POST',
            body:paramsBody,
        });
        console.log(response)
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const bulkElipse = async (paramsBody) => {
    try {
        const response = await fetch(URL_API.bulkElipse, {
            method:'POST',
            body:paramsBody,
        });
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const bulkBanlaws = async (paramsBody) => {
    try {
        const response = await fetch(URL_API.bulkBanlaws, {
            method:'POST',
            body:paramsBody,
        });
        console.log(response)
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const bulkUnit = async (paramsBody) => {
    try {
        const response = await fetch(URL_API.bulkUnit, {
            method:'POST',
            body:paramsBody,
        });
        console.log(response)
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const bulkOperator = async (paramsBody) => {
    try {
        const response = await fetch(URL_API.bulkOperators, {
            method:'POST',
            body:paramsBody,
        });
        console.log(response)
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};
const bulkMasterData = {
    bulkStation,
    bulkUnit,
    bulkBanlaws,
    bulkElipse,
    bulkSonding,
    bulkOperator
};

export default bulkMasterData;