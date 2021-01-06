import axios from 'axios';
import * as localStorage from "local-storage";
import {environment} from "../../enviroment/enviroment";

export const axiosConfig = () => axios.create({
    baseURL: environment.apiUrl,
    headers: {
        Authorization: `Bearer ${localStorage.get('token')}`,
    },
});
