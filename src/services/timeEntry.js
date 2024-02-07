import axios from 'axios'
import Cookies from 'js-cookie'
import { URL_ENUMS } from '../utils/Enums'

const api = axios.create({
  maxBodyLength: Infinity
})

api.interceptors.request.use(config => {
  const jwt = Cookies.get('token')
  if (!jwt) throw new Error('JWT not found in cookies')
  config.headers.Authorization = `Bearer ${jwt}`
  return config
})

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

const postTimeEntrySupport = async data => {
  const response = await api.post(URL_ENUMS.postTimeEntrySupport, data)
  return response.data
}

const Services = {
  getMasterActivity,
  getMasterTimeEntryOperator,
  postTimeEntrySupport,
  getMasterTimeEntryUnit
}


export default Services
