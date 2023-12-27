import { configureStore } from '@reduxjs/toolkit';
import usersReduser from './slices/UsersSlices';

const reducer = {
    userList: usersReduser,
}

const store = configureStore({reducer});
export default store;