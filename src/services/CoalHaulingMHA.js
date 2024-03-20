import { URL_ENUMS } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
    maxBodyLength: Infinity,
});

const getAllDataHauling = async () => {
    const response = await api.get(URL_ENUMS.getAllDataHauling);
    return response.data;
};

const getDataHaulingByDate = async () => {
    const response = await api.get(URL_ENUMS.getDataHaulingByDate)
    return response.data
}

const getTotalHauling = async () => {
    const response = await api.get(URL_ENUMS.getTotalHauling)
    return response.data
}

const getTotalHopper = async () => {
    const response = await api.get(URL_ENUMS.getTotalHopper)
    return response.data
}

const getTotalOverflow = async () => {
    const response = await api.get(URL_ENUMS.getTotalOverflow)
    return response.data
}

const getTotalECF = async () => {
    const response = await api.get(URL_ENUMS.getTotalECF)
    return response.data
}

const getTotalMiddlestock = async () => {
    const response = await api.get(URL_ENUMS.getTotalMiddlestock)
    return response.data
}

const getTotalSekurau = async () => {
    const response = await api.get(URL_ENUMS.getTotalSekurau)
    return response.data
}

const CoalHaulingMHA = {
    getAllDataHauling,
    getDataHaulingByDate,
    getTotalHauling,
    getTotalHopper,
    getTotalOverflow,
    getTotalECF,
    getTotalMiddlestock,
    getTotalSekurau
}

export default CoalHaulingMHA