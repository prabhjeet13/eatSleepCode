import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    problemData : null,
    step : 1,
    edit : false,
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
        },
        setedit(state,value) {
            state.edit= value.payload;
        }
    }
})

export const {setProblem,setStep,setedit} = problemSlice.actions;
export default problemSlice.reducer;