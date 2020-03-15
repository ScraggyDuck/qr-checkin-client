import axios from 'axios';


const checkUser = async (userId) => {
    const { data: user } = await axios.get(`http://localhost:4000/users/${userId}`);
    return user;
}

const createUser = (user) => {
    return axios.post('http://localhost:4000/users/create', {
        fullName: user.fullName
    });
}

export default { checkUser, createUser };