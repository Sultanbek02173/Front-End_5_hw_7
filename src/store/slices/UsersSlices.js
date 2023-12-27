import { createSlice } from '@reduxjs/toolkit';
import fetchAllUsers from '../reducer/userCreated';

const initialState = {
    users: [],
    isLoading: false,
    errorUsers: '',
    userStatus: 'pending'
}

const usersSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            state.users = [];
            state.userStatus = 'pending';
            state.isLoading = true;
            state.errorUsers = ''
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;

            if (action.payload.length) {
                state.userStatus = 'fulfilled';
                return;
            }
            state.userStatus = 'empty';
        });
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.userStatus = 'rejected';
            state.isLoading = false;
            state.errorUsers = action.payload;
        });
    }
});

const usersReduser = usersSlices.reducer;

export const { setUsers } = usersSlices.actions;
export default usersReduser;