import { configureStore } from '@reduxjs/toolkit'
import modelReducer from './Model'
import viewModelReducer from './ModelView'

export default configureStore({
  reducer: {
    model: modelReducer,
    viewModel: viewModelReducer
  }
})