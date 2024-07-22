import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    problemData : null,
    step : 1,
}

const problemSlice = createSlice({
    name : "problem",
    initialState : initialState,
    reducers : {
        setProblem(state,value) {
            state.problemData = value.payload;
        },
        setStep(state,value) {
            state.step = value.payload;
        }
    }
})

export const {setProblem,setStep} = problemSlice.actions;
export default problemSlice.reducer;