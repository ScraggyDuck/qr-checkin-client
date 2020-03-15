import axios from 'axios';
import { API_BASE_URL } from '../utils/contants';


const checkUser = async (userId) => {
    const { data: user } = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return user;
}

const createUser = (user) => {
    return axios.post(`${API_BASE_URL}/users/create`, {
        fullName: user.fullName
    });
}

export default { checkUser, createUser };