import { ADD_OUTFIT, AppActions, DELETE_OUTFIT, GET_ALL_OUTFITS, GET_USER_OUTFITS } from '../types/actionTypes';
import { OutfitState } from '../types/outfitTypes';

const initialState: OutfitState = {
  outfit: null,
  outfits: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AppActions) => {
  
  switch(action.type) {
    case ADD_OUTFIT:
        return {
            ...state,
            outfits: [...state.outfits, action.payload]
        }
      case GET_USER_OUTFITS:
          return {
              ...state,
              outfits: action.payload
          }
      case DELETE_OUTFIT:
        
          return {
              ...state,
              outfits: state.outfits.filter((outfit) => outfit.id !== action.payload.id)
              
          }
      case GET_ALL_OUTFITS:
          return {
              ...state,
              outfits: action.payload  
          }
    default: 
      return state;
  }
}