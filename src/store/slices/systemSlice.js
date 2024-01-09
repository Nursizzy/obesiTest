import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isStarted: false,
    language: 'en',
}

export const systemSlice = createSlice({
    name: 'system', initialState, reducers: {
        startDiagnostic: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isStarted = true
        }, // I need reducer that will reset whole state to initialState
        cancelDiagnostic: () => initialState,
        changeSystemLanguage: (state, action) => {
            state.language = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {startDiagnostic, cancelDiagnostic, changeSystemLanguage} = systemSlice.actions

export default systemSlice.reducer