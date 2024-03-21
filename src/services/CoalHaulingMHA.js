import { URL_ENUMS } from "../utils/Enums";
import axios from "axios";

const api = axios.create({
    maxBodyLength: Infinity,
});

const getAllDataHauling = async () => {
    const response = await api.get(URL_ENUMS.getAllDataHauling);
    return response.data;
};

const getDataHaulingByDate = async (tanggal) => {
    const response = await api.get(URL_ENUMS.getDataHaulingByDate+tanggal)
    return response.data
}

const getTotalHauling = async (tanggal) => {
    const response = await api.get(URL_ENUMS.getTotalHauling+tanggal)
    return response.data
}

const getTotalHopper = async (tanggal) => {
    const response = await api.get(URL_ENUMS.getTotalHopper+tanggal)
    return response.data
}

const getTotalOverflow = async (tanggal) => {
    const response = await api.get(URL_ENUMS.getTotalOverflow+tanggal)
    return response.data
}

const getTotalECF = async (tanggal) => {
    const response = await api.get(URL_ENUMS.getTotalECF+tanggal)
    return response.data
}

const getTotalMiddlestock = async (tanggal) => {
    const response = await api.get(URL_ENUMS.getTotalMiddlestock+tanggal)
    return response.data
}

const getTotalSekurau = async (tanggal) => {
    const response = await api.get(URL_ENUMS.getTotalSekurau+tanggal)
    return response.data
}

const downloadExcel = async (tanggal) => {
    const response = await api.get(URL_ENUMS.downloadExcelHauling+tanggal);
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