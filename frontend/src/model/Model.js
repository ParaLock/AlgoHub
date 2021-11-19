
import { createSlice } from '@reduxjs/toolkit'

export const ModelSlice = createSlice({
  name: 'model',
  initialState: {
    selectedOntologyItem: {},
    selectedItem: {},
    currentUser: {},
    ontologyHierarchy: null
  },
  reducers: {
    updateUser: (state, action) => {
      state.currentUser = action.payload
    },
    updateOntology: (state, action) => {
        state.ontologyHierarchy = action.payload
    },
    updateSelectedItem: (state, action) => {
        state.selectedItem = action.payload;
    }
  }
})


export const { updateUser, updateOntology, updateSelectedItems } = ModelSlice.actions
export default ModelSlice.reducer