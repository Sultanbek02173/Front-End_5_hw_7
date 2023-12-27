import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:5000' });

const getUsers = () => instance.get('/user');
const addUsers = (payload) => instance.post('/user', payload);
const updateUsers = (payload) => instance.put(`/user/${payload.id}`, payload);
const deleteUsers = (payload) => instance.delete(`/user/${payload}`);


export const api = {
    getUsers,
    addUsers,
    updateUsers,
    deleteUsers,
}