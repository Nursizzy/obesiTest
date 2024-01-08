import { combineReducers, configureStore } from '@reduxjs/toolkit'
import systemReducer from './slices/systemSlice'
import phenotypeReducer from './slices/phenotypesSlice.js'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

export const rootReducers = combineReducers({
  system: systemReducer,
  phenotypes: phenotypeReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducers)
export const store = configureStore({
  reducer: persistedReducer,
})