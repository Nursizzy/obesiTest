import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../instance.js'

const initialState = {
    calculateEmotionalSatiation: {
        questions: [], statuses: {
            isError: false, isFulfilled: false, isPending: false,
        }, response: {result: null, message: ''}, data: {}, currentQuestionIndex: 0
    }, calculateBMI: {
        data: {
            weight: null, height: null,
        }, response: {
            result: null, message: ''
        }, statuses: {
            isError: false, isFulfilled: false, isPending: false,
        }
    }, calculateBrainSatiation: {
        data: {
            hungry: null, full: null,
        }, response: {
            result: null, message: ''
        }, statuses: {
            isError: false, isFulfilled: false, isPending: false,
        }
    }, calculateIntestinesSatiation: {
        data: {
            hungry: null, full: null,
        }, response: {
            result: null, message: ''
        }, statuses: {
            isError: false, isFulfilled: false, isPending: false,
        }
    }, calculateEnergySatiation: {
        data: {
            weight: null, height: null, bmi: null, age: null, gender: false
        }, response: {
            result: null, message: ''
        }, statuses: {
            isError: false, isFulfilled: false, isPending: false,
        }
    }
}

export const phenotypesSlice = createSlice({
    name: 'phenotypes', initialState, reducers: {
        addEnergySatiationResult: (state, action) => {
            state.calculateEnergySatiation.response = action.payload;
        }, addBmiResult: (state, action) => {
            state.calculateBMI.response.message = action.payload;
        }, addBMIData: (state, action) => {
            state.calculateBMI.data = action.payload;
        }, addBrainData: (state, action) => {
            state.calculateBrainSatiation.data = action.payload;
        }, addIntestinesData: (state, action) => {
            state.calculateIntestinesSatiation.data = action.payload;
        }, addEmotionsData: (state, action) => {
            state.calculateEmotionalSatiation.data = action.payload;
        }, addEnergyData: (state, action) => {
            state.calculateEnergySatiation.data = action.payload;
        }, setCurrentQuestionIndex: (state, action) => {
            state.calculateEmotionalSatiation.currentQuestionIndex = action.payload;
        }, clearState: () => initialState
    }, extraReducers: builder => {
        builder.addCase(fetchQuestions.fulfilled, (state, {payload}) => {
            state.calculateEmotionalSatiation.statuses.isPending = false;
            state.calculateEmotionalSatiation.statuses.isFulfilled = true;
            state.calculateEmotionalSatiation.statuses.isError = false;
            state.calculateEmotionalSatiation.questions = payload.data;
        });
        builder.addCase(fetchQuestions.pending, (state) => {
            state.calculateEmotionalSatiation.statuses.isPending = true;
            state.calculateEmotionalSatiation.statuses.isFulfilled = false;
            state.calculateEmotionalSatiation.statuses.isError = false;
        });
        builder.addCase(fetchQuestions.rejected, (state) => {
            state.calculateEmotionalSatiation.statuses.isPending = false;
            state.calculateEmotionalSatiation.statuses.isFulfilled = false;
            state.calculateEmotionalSatiation.statuses.isError = true;
        });
        /// CALCULATE BMI
        builder.addCase(calculateBMI.fulfilled, (state, {payload}) => {
            state.calculateBMI.statuses.isPending = false;
            state.calculateBMI.statuses.isFulfilled = true;
            state.calculateBMI.statuses.isError = false;
            state.calculateBMI.response = payload;
        });
        builder.addCase(calculateBMI.pending, (state) => {
            state.calculateBMI.statuses.isPending = true;
            state.calculateBMI.statuses.isFulfilled = false;
            state.calculateBMI.statuses.isError = false;
        });
        builder.addCase(calculateBMI.rejected, (state) => {
            state.calculateBMI.statuses.isPending = false;
            state.calculateBMI.statuses.isFulfilled = false;
            state.calculateBMI.statuses.isError = true;
        });
        /// CALCULATE BRAIN SATIATION
        builder.addCase(calculateBrainSatiation.fulfilled, (state, {payload}) => {
            state.calculateBrainSatiation.statuses.isPending = false;
            state.calculateBrainSatiation.statuses.isFulfilled = true;
            state.calculateBrainSatiation.statuses.isError = false;
            state.calculateBrainSatiation.response = payload;
        });
        builder.addCase(calculateBrainSatiation.pending, (state) => {
            state.calculateBrainSatiation.statuses.isPending = true;
            state.calculateBrainSatiation.statuses.isFulfilled = false;
            state.calculateBrainSatiation.statuses.isError = false;
        });
        builder.addCase(calculateBrainSatiation.rejected, (state) => {
            state.calculateBrainSatiation.statuses.isPending = false;
            state.calculateBrainSatiation.statuses.isFulfilled = false;
            state.calculateBrainSatiation.statuses.isError = true;
        });
        /// CALCULATE INTESTINES SATIATION
        builder.addCase(calculateIntestinesSatiation.fulfilled, (state, {payload}) => {
            state.calculateIntestinesSatiation.statuses.isPending = false;
            state.calculateIntestinesSatiation.statuses.isFulfilled = true;
            state.calculateIntestinesSatiation.statuses.isError = false;
            state.calculateIntestinesSatiation.response = payload;
        });
        builder.addCase(calculateIntestinesSatiation.pending, (state) => {
            state.calculateIntestinesSatiation.statuses.isPending = true;
            state.calculateIntestinesSatiation.statuses.isFulfilled = false;
            state.calculateIntestinesSatiation.statuses.isError = false;
        });
        builder.addCase(calculateIntestinesSatiation.rejected, (state) => {
            state.calculateIntestinesSatiation.statuses.isPending = false;
            state.calculateIntestinesSatiation.statuses.isFulfilled = false;
            state.calculateIntestinesSatiation.statuses.isError = true;
        });
        /// CALCULATE EMOTION SATIATION
        builder.addCase(calculateEmotionSatiation.fulfilled, (state, {payload}) => {
            state.calculateEmotionalSatiation.statuses.isPending = false;
            state.calculateEmotionalSatiation.statuses.isFulfilled = true;
            state.calculateEmotionalSatiation.statuses.isError = false;
            state.calculateEmotionalSatiation.response = payload;
        });
        builder.addCase(calculateEmotionSatiation.pending, (state) => {
            state.calculateEmotionalSatiation.statuses.isPending = true;
            state.calculateEmotionalSatiation.statuses.isFulfilled = false;
            state.calculateEmotionalSatiation.statuses.isError = false;
        });
        builder.addCase(calculateEmotionSatiation.rejected, (state) => {
            state.calculateEmotionalSatiation.statuses.isPending = false;
            state.calculateEmotionalSatiation.statuses.isFulfilled = false;
            state.calculateEmotionalSatiation.statuses.isError = true;
        });
    }
})

export const fetchQuestions = createAsyncThunk('phenotypes/fetchQuestions', async () => {
    try {
        const response = await instance.get(`/questions/1`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
})

export const calculateBMI = createAsyncThunk('phenotypes/calculateBMI', async data => {
    try {
        const formData = new FormData();
        formData.append('category_key', 'diagnosis_of_excess_weight');
        formData.append('value[weight]', data.weight);
        formData.append('value[height]', data.height);
        const response = await instance.post('/calculate-result', formData);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
})

export const calculateBrainSatiation = createAsyncThunk('phenotypes/calculateBrainSatiation', async data => {
    try {
        const formData = new FormData();
        formData.append('category_key', 'diagnosis_of_abnormal_satiety_phenotype');
        formData.append('value[how_hungry_do_you_feel]', data.hungry);
        formData.append('value[how_full_do_you_feel_in_your_stomach]', data.full);
        const response = await instance.post('/calculate-result', formData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
})

export const calculateIntestinesSatiation = createAsyncThunk('phenotypes/calculateIntestinesSatiation', async data => {
    try {
        const formData = new FormData();
        formData.append('category_key', 'diagnosis_of_the_post_meal_abnormal_satiety_phenotype');
        formData.append('value[how_hungry_do_you_feel]', data.hungry);
        formData.append('value[how_full_do_you_feel_in_your_stomach]', data.full);
        const response = await instance.post('/calculate-result', formData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
})

export const calculateEmotionSatiation = createAsyncThunk('phenotypes/calculateEmotionSatiation', async data => {
    try {
        const formData = new FormData();
        formData.append('category_key', 'diagnosis_of_abnormal_emotional_reactions_to_food');

        Object.entries(data).forEach(([key, value]) => {
            formData.append(`value[${key}]`, value);
        });

        const response = await instance.post('/calculate-result', formData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
})


// Action creators are generated for each case reducer function
export const {
    clearState,
    setCurrentQuestionIndex,
    addEnergySatiationResult, addBmiResult, addEnergyData, addBrainData, addBMIData, addIntestinesData, addEmotionsData
} = phenotypesSlice.actions

export default phenotypesSlice.reducer