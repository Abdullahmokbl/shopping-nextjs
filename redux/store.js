import { configureStore } from "@reduxjs/toolkit";
import productsSlice from './productsSlice';
import usersSlice from "./usersSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice,
        products: productsSlice
    }
})