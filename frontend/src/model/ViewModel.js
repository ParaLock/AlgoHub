
import { createSlice } from '@reduxjs/toolkit'
import { expandParents } from '../boundary/common/Common';
export const ViewModelSlice = createSlice({
  name: 'view_model',
  initialState: {
    selectedOntologyItem: {},
    selectedItem: {},
    expandedOntologyItems: {},
    openPanels: [],
    operationStatus: {},
    loadingStatus: {},
    headerTitle: "Welcome to AlgoHub"
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
    },
    updateOperationStatus: (state, action) => {

      state.operationStatus[action.payload.name] = {
        ...state.operationStatus[action.payload.name],
        ...action.payload
      }

    },
    updateSelectedOntologyItem: (state, action) => {

      var parent = action.payload.parent;
      var title = "";

      if(parent) {
        title = parent.name;
      }

      var selected = action.payload.selectedItem;

      if(selected) {
        title += "." + selected.name;
      }

      state.headerTitle = title;
      state.selectedOntologyItem = selected;
    },
    updateExpanded: (state, action) => {

      state.expandedOntologyItems = action.payload;

    }, 
    updateSelectedItem: (state, action) => {

      state.selectedItem[action.payload.name] = action.payload.item;

    },
    updateLoadingStatus: (state, action) => {

      state.loadingStatus[action.payload.name] = action.payload.state;
    }
  }
})


export const { 
                togglePanelVisibility, 
                setPanelVisibility,
                updateExpandedOntologyItems,
                updateOperationStatus,
                updateExpanded
} = ViewModelSlice.actions
export default ViewModelSlice.reducer