import axios from 'axios'
import { URL_ENUMS } from '../utils/Enums'

const api = axios.create({
    maxBodyLength: Infinity
})

// api.interceptors.request.use(config => {
//   const jwt = Cookies.get('token')
//   if (!jwt) throw new Error('JWT not found in cookies')
//   config.headers.Authorization = Bearer ${jwt}
//   return config
// })

const getAllTransaction = async () => {
    const response = await api.get(URL_ENUMS.transactionHoul)
    console.log(1, response);
    return response.data
}

const getEditTransaction = async () => {
    const response = await api.get(URL_ENUMS.transactionHoul)
    console.log(1, response);
    return response.data
}

const getDeteleTransaction = async () => {
    const response = await api.get(URL_ENUMS.transactionHoul)
    console.log(1,response);
    return response.data
}

const postCreateTransaction = async data => {
    const response = await api.post(URL_ENUMS.postCreateTransaction, data)
    console.log(response);
    return response.data
    // console.log(data);
  }

const Transaksi = {
  getAllTransaction,
  getEditTransaction,
  getDeteleTransaction,
    getAllTransaction,
    getCreateTransaction
}


export default Transaksi