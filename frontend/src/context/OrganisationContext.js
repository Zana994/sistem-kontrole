import { createContext, useReducer } from "react";

export const OrganisationContext = createContext();

export const organisationsReducer = (state, action) => {
  switch(action.type) {
    case 'SET_ORGANISATIONS':
      return {
        organisations: action.payload
      }
    case 'CREATE_ORGANISATION':
      return {
        organisations: [...state.organisations, action.payload]
      }
    case 'UPDATE_ORGANISATION':
      return {
        organisations: state.organisations.map(organisation => (organisation._id === action.payload._id) ? action.payload : organisation)
      }
    case 'DELETE_ORGANISATION':
      return {
        organisations: state.organisations.filter(organisation => organisation._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const OrganisationsContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(organisationsReducer, {
    organisations: null
  });

  return (
    <OrganisationContext.Provider value={{...state, dispatch}}>
      {children}
    </OrganisationContext.Provider>
  )
}