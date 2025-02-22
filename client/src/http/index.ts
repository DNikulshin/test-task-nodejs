import axios from 'axios'


const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.API_URL || 'http://localhost:5000/api',
})

export default $api