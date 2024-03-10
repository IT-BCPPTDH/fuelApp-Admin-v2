import axios from "axios";
import { URL_ENUMS } from "../utils/Enums";

const api = axios.create({
  maxBodyLength: Infinity,
});

// api.interceptors.request.use(config => {
//   const jwt = Cookies.get('token')
//   if (!jwt) throw new Error('JWT not found in cookies')
//   config.headers.Authorization = Bearer ${jwt}
//   return config
// })

const getAllTransaction = async (tanggal) => {
  const response = await api.post(URL_ENUMS.transactionHoul+tanggal);
  return response.data;
};

const getEditTransaction = async () => {
  const response = await api.get(URL_ENUMS.transactionHoul);
  return response.data;
};

const patchEditTransaction = async (id,data) => {
  // console.log(id)
  // console.log(URL_ENUMS.patchEditData+id)
  const response = await api.patch(URL_ENUMS.patchEditData+id,data);
  return response.data;
};

const getDownload = async (tanggal) => {
  const response = await api.get(URL_ENUMS.getDownload+tanggal);
  return response.data;
};

const getDeteleTransaction = async (id) => {
  const response = await api.patch(URL_ENUMS.getDeteleData+id);
  return response.data;
};

const postCreateTransaction = async (data) => {
  const response = await api.post(URL_ENUMS.postCreateTransaction, data);
  return response.data;
};

const getEditData = async (id) => {
  const response = await api.get(URL_ENUMS.getEditData+id);
  return response.data;
};

const getDataTotal = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataTotal+tanggal);
  return response.data;
};

const getDataHopper = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataHopper+tanggal);
  return response.data;
};

const getDataOverflow = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataOverflow+tanggal);
  return response.data;
};

const getDataECF = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataECF+tanggal);
  return response.data;
};

const getDataMiddleStock = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataMiddleStcok+tanggal);
  return response.data;
};

const getDataSekurau = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataSekurau+tanggal);
  return response.data;
};

const getDataMain = async () => {
  const response = await api.get(URL_ENUMS.dataMain);
  return response.data;
};

const getPingServer = async () => {
  const response = await api.get(URL_ENUMS.ping);
  return response.data;
};



const Transaksi = {
  getAllTransaction,
  getEditTransaction,
  getDeteleTransaction,
  postCreateTransaction,
  getDataTotal,
  getEditData,
  patchEditTransaction,
  getDataHopper,
  getDataOverflow,
  getDataECF,
  getDataMiddleStock,
  getDataSekurau,
  getDownload,
  getDataMain,
  getPingServer,
};


export default Transaksi;
