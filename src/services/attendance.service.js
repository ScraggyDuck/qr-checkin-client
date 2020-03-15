import axios from 'axios';
import userServices from './user.services';

const isCheckIn = async (userId) => {
    if (await userServices.checkUser(userId)) {
        const { data: user } = await axios.get(`http://localhost:4000/checkin-history/${userId}`);
        if (user && user.isCheckIn) {
            return true;
        }
    }
    return false;
}

const getAll = async () => {
    const res = await axios.get(`http://localhost:4000/checkin-history`);
    return res.data;
}

const createAttendance = ({ fullName, userId, isCheckIn }) => {
    console.log(fullName, userId, isCheckIn);

    return axios.post('http://localhost:4000/checkin-history/create', {
        fullName,
        userId,
        isCheckIn
    });
}

export default { isCheckIn, createAttendance, getAll };