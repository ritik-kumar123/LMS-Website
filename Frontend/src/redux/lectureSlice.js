import { createSlice } from "@reduxjs/toolkit";

const initialState={
    lectureData:[]
}

const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{
    
        setlectureData:(state,action)=>
        {
            state.lectureData = action.payload;
        }
    }
})
export const { setlectureData } = lectureSlice.actions;
export default lectureSlice.reducer