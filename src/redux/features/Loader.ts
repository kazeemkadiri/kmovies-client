import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false
}

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        showLoader: (state, payload) => {
            state.show = payload.payload
            return state;
        }
    }
});

export const loaderReducer = loaderSlice.reducer;

export const { showLoader } = loaderSlice.actions;