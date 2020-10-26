import axios from "axios";
/*import {PUBLIC_URL} from "react-native-dotenv"*/
import AsyncStorage from '@react-native-async-storage/async-storage';


export const axiosConfig = () =>
    axios.create({
        //baseURL: PUBLIC_URL,
        headers: {
            Authorization: `Bearer ${AsyncStorage.getItem("token")}`,
        },
    });
