import { createContext, useReducer } from 'react';

export const ControlContext = createContext();

export const controlsReducer = (state, action) => {
  switch(action.type) {
    case 'SET_CONTROLS':
      return {
        controls: action.payload
      }
    case 'CREATE_CONTROL':
      return {
        controls: [...state.controls, action.payload]
      }
    case 'DELETE_CONTROL':
      return {
        controls: state.controls.filter(control => control._id !== action.payload._id)
      }
    case 'UPDATE_CONTROL':
      return {
        controls: state.controls.map(control => (control._id !== action.payload._id) ? control : action.payload)
      }
    default:
      return state
  }
}

export const ControlsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(controlsReducer, {
    controls: null
  });

  return(
    <ControlContext.Provider value={{...state, dispatch}}>
      {children}
    </ControlContext.Provider>
  )
}