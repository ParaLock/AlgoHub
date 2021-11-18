
import { createSlice } from '@reduxjs/toolkit'

export const ViewModelSlice = createSlice({
  name: 'view_model',
  initialState: {
    selectedOntologyItem: {},
    selectedItem: {},
    expandedOntologyItems: {},
    openPanels: []
  },
  reducers: {
    togglePanelVisibility: (state, action) => {

        if(!(action.payload.name in state.openPanels)) {
            state.openPanels.push(action.payload.name);
        } else {
            state.openPanels = state.openPanels.filter((item) => item != action.payload.name);
        }
    },
    setPanelVisibility: (state, action) => {

        state.openPanels = state.openPanels.filter((item) => item != action.payload.name);

        if(action.payload.state) {
            state.openPanels.push(action.payload.name);
        }
    },
    updateExpandedOntologyItems: (state, action) => {

        state.expandedOntologyItems = action.payload;
    }
  }
})


export const { 
                togglePanelVisibility, 
                setPanelVisibility,
                updateExpandedOntologyItems
} = ViewModelSlice.actions
export default ViewModelSlice.reducer