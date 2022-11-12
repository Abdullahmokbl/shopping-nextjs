import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const addToken = () => {
    // get token
    const token = getCookie('token')
    
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        }
    }

    if (token) axiosConfig.headers['x-auth-token'] = token;

    return axiosConfig;
}

export const loadUser = createAsyncThunk('user/load', async () => {

    const res = await axios.get(process.env.NEXT_PUBLIC_API+"/users/user", addToken());
    return res.data;
})

export const signup = createAsyncThunk('user/add', async (user, {rejectWithValue}) => {
    try{
        const res = await axios.post(process.env.NEXT_PUBLIC_API+"/signup", user);
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})
export const login = createAsyncThunk('user/get', async (user, {rejectWithValue}) => {
    try{
        const res = await axios.post(process.env.NEXT_PUBLIC_API+"/login", user);
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})
export const getUsers = createAsyncThunk('users/get', async () => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API+"/users", addToken());
    return res.data;
})
export const getSomeUsers = createAsyncThunk('users/getsome', async (pageNum) => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API+"/users/some/"+pageNum, addToken());
    return res.data;
})
export const delUser = createAsyncThunk('user/del', async (id, {rejectWithValue}) => {
    try{
        const res = await axios.delete(process.env.NEXT_PUBLIC_API+"/users/"+id, addToken());
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})
export const delAllUsers = createAsyncThunk('users/del', async (s, {rejectWithValue}) => {
    try{
        const res = await axios.delete(process.env.NEXT_PUBLIC_API+"/users", addToken());
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: null,
        someUsers: [],
        pageNum: null,
        u_pagesCount: null,
        usersCount: null
    },
    reducers: {
        logout: state => {
            deleteCookie('token')
            state.user = null,
            state.isAuthenticated = false
        }
    },
    extraReducers: {
        [loadUser.pending]: state => {
            state.isLoading = true;
        },
        [loadUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        [loadUser.rejected]: (state, error) => {
            state.isLoading = false;
            deleteCookie('token')
        },
        [signup.pending]: state => {},
        [signup.fulfilled]: (state, action) => {
            setCookie('token', action.payload.token)
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.users.push(action.payload.user)
        },
        [signup.rejected]: (state, error) => {},
        [login.pending]: state => {},
        [login.fulfilled]: (state, action) => {
            setCookie('token', action.payload.token)
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        [login.rejected]: (state, error) => {},
        [getUsers.pending]: state => {},
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
        },
        [getUsers.rejected]: (state, error) => {},
        [getSomeUsers.pending]: state => {},
        [getSomeUsers.fulfilled]: (state, action) => {
            state.someUsers = action.payload.users;
            state.u_pagesCount = action.payload.pagesCount;
            state.usersCount = action.payload.usersCount;
        },
        [getSomeUsers.rejected]: (state, error) => {},
        [delUser.pending]: state => {},
        [delUser.fulfilled]: (state, action) => {
            return {
                ...state,
                someUsers: [...state.someUsers].filter(p => p._id !== action.payload)
            }
        },
        [delUser.rejected]: (state, error) => {},
        [delAllUsers.pending]: state => {},
        [delAllUsers.fulfilled]: (state, action) => {
            state.users = [];
        },
        [delAllUsers.rejected]: (state, error) => {
        },
    }
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;