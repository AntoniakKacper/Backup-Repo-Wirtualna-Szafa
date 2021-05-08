import { ADD_OUTFIT, AppActions, DELETE_OUTFIT, GET_USER_OUTFITS } from '../types/actionTypes';
import { OutfitState } from '../types/outfitTypes';

const initialState: OutfitState = {
  outfit: null,
  userOutfits: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AppActions) => {
  
  switch(action.type) {
    case ADD_OUTFIT:
        return {
            ...state,
            userOutfits: [...state.userOutfits, action.payload]
        }
      case GET_USER_OUTFITS:
          return {
              ...state,
              userOutfits: action.payload
          }
      case DELETE_OUTFIT:
        
          return {
              ...state,
              userOutfits: state.userOutfits.filter((outfit) => outfit.id !== action.payload.id)
              
          }

    default: 
      return state;
  }
}