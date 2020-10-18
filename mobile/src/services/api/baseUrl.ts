import axios from 'axios'

const baseUrl = axios.create({
    baseURL: 'http://192.168.0.14:3333'
})

export default baseUrl