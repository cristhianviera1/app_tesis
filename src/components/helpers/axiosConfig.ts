import axios from 'axios';
import * as localStorage from "local-storage";

export const axiosConfig = () => axios.create({
    baseURL: 'http://192.168.100.24:3000/',
    headers: {
        Authorization: `Bearer ${localStorage.get('token')}`,
    },
});
