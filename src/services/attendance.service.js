import axios from 'axios';
import userServices from './user.services';
import { API_BASE_URL } from '../utils/contants';

const isCheckIn = async (userId) => {
    if (await userServices.checkUser(userId)) {
        const { data: user } = await axios.get(`${API_BASE_URL}/history/${userId}`);
        if (user && user.isCheckIn) {
            return true;
        }
    }
    return false;
}

const getAll = async () => {
    const res = await axios.get(`${API_BASE_URL}/history`);
    return res.data;
}

const createAttendance = ({ fullName, userId, isCheckIn }) => {
    return axios.post(`${API_BASE_URL}/history/create`, {
        fullName,
        userId,
        isCheckIn
    });
}

export default { isCheckIn, createAttendance, getAll };