import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    userDetail: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUserDetails: (state, action) => {
            state.userDetail = action.payload;
        },
        logOut: (state, action) => {
            state.token = "",
                state.duplicateSmToken = "",
                state.userDetail = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setToken, setUserDetails, logOut } =
    userSlice.actions;

export default userSlice.reducer;
