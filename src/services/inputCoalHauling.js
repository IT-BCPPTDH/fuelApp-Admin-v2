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
  // console.log(1, response);
  return response.data;
};

const getEditTransaction = async () => {
  const response = await api.get(URL_ENUMS.transactionHoul);
  // console.log(1, response);
  return response.data;
};

const patchEditTransaction = async (id,data) => {
  // console.log(id)
  // console.log(URL_ENUMS.patchEditData+id)
  const response = await api.patch(URL_ENUMS.patchEditData+id,data);
  // console.log(1, response);
  return response.data;
};

const getDownload = async (tanggal) => {
  const response = await api.get(URL_ENUMS.getDownload+tanggal);
  // console.log(1, response);
  return response.data;
};

const getDeteleTransaction = async (id) => {
  const response = await api.patch(URL_ENUMS.getDeteleData+id);
  // console.log(1, response);
  return response.data;
};

const postCreateTransaction = async (data) => {
  const response = await api.post(URL_ENUMS.postCreateTransaction, data);
  // console.log(response);
  return response.data;
  // console.log(data);
};

const getEditData = async (id) => {
  const response = await api.get(URL_ENUMS.getEditData+id);
  // console.log(1, response);
  return response.data;
};

const getDataTotal = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataTotal+tanggal);
  console.log(13, response.data);
  return response.data;
};

const getDataHopper = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataHopper+tanggal);
  // console.log(1, response);
  return response.data;
};

const getDataOverflow = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataOverflow+tanggal);
  // console.log(1, response);
  return response.data;
};

const getDataECF = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataECF+tanggal);
  // console.log(1, response);
  return response.data;
};

const getDataMiddleStock = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataMiddleStcok+tanggal);
  // console.log(1, response);
  return response.data;
};

const getDataSekurau = async (tanggal) => {
  const response = await api.post(URL_ENUMS.cardDataSekurau+tanggal);
  // console.log(1, response);
  return response.data;
};

const getDataMain = async () => {
  const response = await api.get(URL_ENUMS.dataMain);
  // console.log(1, response);
  return response.data;
};

const getPingServer = async () => {
  const response = await api.get(URL_ENUMS.ping);
  // console.log(1, response);
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
