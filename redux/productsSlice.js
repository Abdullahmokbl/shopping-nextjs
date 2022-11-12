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

export const getProducts = createAsyncThunk('products/get', async () => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API+"/products");
    return res.data;
})
export const getSomeProducts = createAsyncThunk('products/getsome', async (pageNum) => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API+"/products/some/"+pageNum);
    return res.data;
})
export const getProduct = createAsyncThunk('product/get', async (id) => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API+"/products", id);
    return res.data;
})
export const addProduct = createAsyncThunk('product/add', async (product, {rejectWithValue}) => {
    try{
        const res = await axios.post(process.env.NEXT_PUBLIC_API+"/products/product", product, addToken());
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})
export const delProduct = createAsyncThunk('product/del', async (id, {rejectWithValue}) => {
    try{
        const res = await axios.delete(process.env.NEXT_PUBLIC_API+"/products/"+id, addToken());
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})
export const delAllProducts = createAsyncThunk('products/del', async (s,{rejectWithValue}) => {
    try{
        const res = await axios.delete(process.env.NEXT_PUBLIC_API+"/products", addToken());
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }
})

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: null,
        someProducts: [],
        pageNum: null,
        p_pagesCount: null,
        productsCount: null,
        imgUrl: process.env.NEXT_PUBLIC_API+'/uploads/'
        },
    extraReducers: {
        [getProducts.pending]: state => {},
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload
        },
        [getProducts.rejected]: (state, error) => {},
        [getProduct.pending]: state => {},
        [getProduct.fulfilled]: (state, action) => {
            state.product = action.payload
        },
        [getProduct.rejected]: (state, error) => {},
        [getSomeProducts.pending]: state => {},
        [getSomeProducts.fulfilled]: (state, action) => {
            state.someProducts = action.payload.products;
            state.p_pagesCount = action.payload.pagesCount;
            state.productsCount = action.payload.productsCount;
        },
        [getSomeProducts.rejected]: (state, error) => {},
        [addProduct.pending]: state => {},
        [addProduct.fulfilled]: (state, action) => {
            state.products.push(action.payload)
        },
        [addProduct.rejected]: (state, error) => {},
        [delProduct.pending]: state => {},
        [delProduct.fulfilled]: (state, action) => {
            return {
                ...state,
                someProducts: [...state.someProducts].filter(p => p._id !== action.payload)
            }
        },
        [delProduct.rejected]: (state, error) => {},
        [delAllProducts.pending]: state => {},
        [delAllProducts.fulfilled]: (state, action) => {
            state.products = []
        },
        [delAllProducts.rejected]: (state, error) => {},
    }
})

export default productsSlice.reducer;