import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://api-v2.cloudoc.kz/api',
    headers: {
        withCredentials: true,
    }
});