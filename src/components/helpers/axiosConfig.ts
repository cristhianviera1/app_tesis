import axios from 'axios';
import {environment} from "../../enviroment/enviroment";
import * as localStorage from "local-storage";

export const axiosConfig = () => axios.create({
    baseURL: environment.apiUrl,
    headers: {
        Authorization: `Bearer ${localStorage.get('token')}`,
    },
});
