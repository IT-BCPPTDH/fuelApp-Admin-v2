import axios from 'axios'
// import Cookies from 'js-cookie'
import { URL_ENUMS } from '../utils/Enums'

const api = axios.create({
  maxBodyLength: Infinity
})

// api.interceptors.request.use(config => {
//   const jwt = Cookies.get('token')
//   if (!jwt) throw new Error('JWT not found in cookies')
//   config.headers.Authorization = `Bearer ${jwt}`
//   return config
// })

const getMasterActivity = async () => {
  const response = await api.get(URL_ENUMS.masterActivity)
  return response.data
}

const getMasterTimeEntryOperator = async () => {
  const response = await api.get(URL_ENUMS.masterTimeEntryOperator)
  return response.data
}

const getMasterTimeEntryUnit = async () => {
  const response = await api.get(URL_ENUMS.masterTimeEntryUnit)
  return response.data
}

const postTimeEntryData = async data => {
  const response = await api.post(URL_ENUMS.postTimeEntrySupport, data)
  return response.data
}

const getDataFMS = async () => {
  const response = await api.get(URL_ENUMS.getDataFMS)
  return response.data
}
const getDataMines = async () => {
  const response = await api.get(URL_ENUMS.getDataMines)
  return response.data
}
const getAllTimeEntryData = async () => {
  const response = await api.get(URL_ENUMS.getAllTimeEntryData)
  return response.data
}
const getTimeEntryDetailData = async (date, type) => {
  const response = await api.get(`${URL_ENUMS.getTimeEntryDetailData}${date}/${type}`)
  return response.data
}
const Services = {
  getMasterActivity,
  getMasterTimeEntryOperator,
  postTimeEntryData,
  getMasterTimeEntryUnit,
  getDataFMS,
  getDataMines,
  getAllTimeEntryData,
  getTimeEntryDetailData
}

export default Services