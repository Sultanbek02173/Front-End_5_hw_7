import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { setUsers } from '../slices/UsersSlices';

const fetchAllUsers = createAsyncThunk('user/fetchAll', async (payload, thunkApi) => {
    try {
        const response = await api.getUsers();
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const fetchAddToUser = createAsyncThunk('user/addUser', async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    try {
        const { users } = thunkApi.getState().userList;
        const newItem = payload;

        api.addUsers(newItem);
        return dispatch(setUsers([...users, newItem]))
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
});

export const fetchDeleteToUser = createAsyncThunk('user/deleteUser', async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    try {
        const { users } = thunkApi.getState().userList;

        api.deleteUsers(payload);
        return dispatch(setUsers(users.filter(({ id }) => id !== payload)))
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const fetchChangeToUser = createAsyncThunk('user/chegeUser', async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    try {
        const {users} = thunkApi.getState().userList;

        api.updateUsers(payload);
        return dispatch(setUsers(users.map((el) =>(payload.id === el.id ? payload : el))))
    } catch (error) {
        thunkApi.rejectWithValue(error);
    }
})

export default fetchAllUsers;