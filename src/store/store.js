import {configureStore} from "@reduxjs/toolkit";
import mainReducer from "./reducers/mainSliсe"


export const store = configureStore({
    reducer: {
        main: mainReducer
    }
})