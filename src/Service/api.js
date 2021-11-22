import axios from 'axios';

const url = 'http://localhost:3003/users';

// const url = 'http://localhost:8000/users';

export const getUsers = async (ID) => {
    ID = ID || "";
    return await axios.get(`${url}/${ID}`);
}

const deleteUser =  async (id) => {
    return await axios.delete(`${url}/${id}`);
}

// export const addUser = async (user) => {
//     return await axios.post(`${url}/add`, user);
// }

export const addUser = async (user) => {
    return await axios.post(url, user);
}

// http://localhost:3000/add

export const editUser = async (id, user) => {
    return await axios.put(`${url}/${id}`, user)
}

export {addUser as default, deleteUser};