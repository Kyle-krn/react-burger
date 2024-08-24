import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../utils/api';
import { removeTokens, setTokens } from '../utils/token';

const initialState = {
    user: {
        name: null,
        email: null,
    },
    isRequestStart: false,
    isRequestSuccess: false,
    isRequestFailed: false,
    failedText: '',
    
    isLoadingUser: true,
}

const startRequest = (state) => {
    state.isRequestStart = true;
    state.isRequestFailed = false;
    state.isRequestSuccess = false;
};

const successRequest = (state) => {
    state.isRequestStart = false;
    state.isRequestFailed = false;
    state.isRequestSuccess = true;
};

const failRequest = (state, errorMessage = 'Что-то пошло не так.') => {
    state.isRequestStart = false;
    state.isRequestFailed = true;
    state.isRequestSuccess = false;
    state.failedText = errorMessage;
};

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({email, password, name}) => {
        const response = await request('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
        return response;
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({email, password}) => {
        
        const response = await request('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
        return response;
    }
)

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async () => {
        const response = await request('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        })
        return response
    }
)

export const getAccessToken = createAsyncThunk(
    'user/getAccessToken', 
    async () => {
        const response = await request('/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        })
        return response
    }
)

export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async ({email}) => {
        const response = await request('/api/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                email
            })
        })
        return response;
    }
)

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async ({password, token}) => {
        const response = await request('/api/password-reset/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                password,
                token,
            })
        })
        return response;
    }
)

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async () => {
        console.log('getUserInfo func start')
        const response = await request('/api/auth/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
        })
        return response
    }
)

export const upadteUserInfo = createAsyncThunk(
    'user/updateUserInfo',
    async ({email, name, password}) => {
        const response = await request('/api/auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                email,
                name,
                password
            })
        })
        return response
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers : {
        resetRequest (state, action) {
            state.isRequestStart = false;
            state.isRequestSuccess = false;
            state.isRequestFailed = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => startRequest(state))
        .addCase(registerUser.fulfilled, (state, action) => {
            successRequest(state);
            if (action.payload.success) {
                state.user = action.payload.user;
                setTokens(action.payload.accessToken, action.payload.refreshToken);
            } else {
                failRequest(state);
            }
        })
        .addCase(registerUser.rejected, (state) => failRequest(state))

        .addCase(loginUser.pending, (state) => startRequest(state))
        .addCase(loginUser.fulfilled, (state, action) => {
            successRequest(state);
            if (action.payload.success) {
                state.user = action.payload.user;
                setTokens(action.payload.accessToken, action.payload.refreshToken);
            } else {
                failRequest(state);
            }
        })
        .addCase(loginUser.rejected, (state) =>failRequest(state))

        .addCase(logoutUser.pending, (state) => startRequest(state))

        .addCase(logoutUser.fulfilled, (state, payload) => {
            removeTokens();
            state.user = { name: null, email: null };
            state.isLoadingUser = false;
        })
        .addCase(logoutUser.rejected, (state) => {
            removeTokens();
            state.user = { name: null, email: null };
            state.isLoadingUser = false;
        })

        .addCase(forgotPassword.pending, (state) => startRequest(state))
        .addCase(forgotPassword.fulfilled, (state, action) => successRequest(state))
        .addCase(forgotPassword.rejected, (state) => failRequest(state))

        .addCase(resetPassword.pending, (state) => startRequest(state))
        .addCase(resetPassword.fulfilled, (state, action) => successRequest(state))
        .addCase(resetPassword.rejected, (state) => failRequest(state))

        .addCase(getUserInfo.pending, (state) => {state.isLoadingUser = true})
        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.isLoadingUser = false;
            state.user = action.payload.user;
        })
        .addCase(getUserInfo.rejected, (state) => {state.isLoadingUser = false})

        .addCase(upadteUserInfo.pending, (state) => startRequest(state))
        .addCase(upadteUserInfo.fulfilled, (state, action) => {
            if (action.payload.success) {
                successRequest(state)
                state.user = action.payload.user
            } else {
                failRequest(state, action.payload.message)
            }
        })
        .addCase(upadteUserInfo.rejected, (state) => failRequest(state))
    },
})


const { actions, reducer } = userSlice;

export const {
    resetRequest
} = actions;

export default reducer;