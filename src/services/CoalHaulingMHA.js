import { URL_ENUMS } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
    maxBodyLength: Infinity,
});

const getAllDataHauling = async () => {
    const response = await api.get(URL_ENUMS.getAllDataHauling);
    return response.data;
};

const getDataHaulingByDate = async (tanggal, sentAt) => {
    const response = await api.get(URL_ENUMS.getDataHaulingByDate+tanggal+'/'+sentAt)
    return response.data
}

const getTotalHauling = async (tanggal, sentAt) => {
    const response = await api.get(URL_ENUMS.getTotalHauling+tanggal+'/'+sentAt)
    return response.data
}

const getTotalHopper = async (tanggal, sentAt) => {
    const response = await api.get(URL_ENUMS.getTotalHopper+tanggal+'/'+sentAt)
    return response.data
}

const getTotalOverflow = async (tanggal, sentAt) => {
    const response = await api.get(URL_ENUMS.getTotalOverflow+tanggal+'/'+sentAt)
    return response.data
}

const getTotalECF = async (tanggal, sentAt) => {
    const response = await api.get(URL_ENUMS.getTotalECF+tanggal+'/'+sentAt)
    return response.data
}

const getTotalMiddlestock = async (tanggal, sentAt) => {
    const response = await api.get(URL_ENUMS.getTotalMiddlestock+tanggal+'/'+sentAt)
    return response.data
}

const getTotalSekurau = async (tanggal, sentAt) => {
    const response = await api.get(URL_ENUMS.getTotalSekurau+tanggal+'/'+sentAt)
    return response.data
}

const downloadExcel = async (tanggal, sentAt) => {
    const response = await api.get(URL_ENUMS.downloadExcelHauling+tanggal+'/'+sentAt);
    return response.data;
  };

const CoalHaulingMHA = {
    getAllDataHauling,
    getDataHaulingByDate,
    getTotalHauling,
    getTotalHopper,
    getTotalOverflow,
    getTotalECF,
    getTotalMiddlestock,
    getTotalSekurau,
    downloadExcel
}

export default CoalHaulingMHA