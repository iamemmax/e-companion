import axios from "axios";
import baseUrl from '../../../components/config/Axios'

export const register = async (userData) => {
    const {data} = await axios.post(`${baseUrl}/users/register`, userData);
    return data;
};


export const login = async (userData) => {
    const {data} = await axios.post(`${baseUrl}/users/login`, userData);
   

    return data;
};

// export const forgetPassword = async (userData) => {
//     const response = await axios.get("https://essential-dating-api.herokuapp.com/api/users/forget-password", userData);
//     return response.data;
// };