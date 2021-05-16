import { ADD_OUTFIT, AppActions, COUNT_CLOTHES_IN_OUTFIT, DELETE_OUTFIT, GET_ALL_OUTFITS, GET_OUTFITS_BY_WEATHER, GET_USER_OUTFITS, LIKE_OUTFIT, UNLIKE_OUTFIT } from '../types/actionTypes';
import { OutfitState } from '../types/outfitTypes';

const initialState: OutfitState = {
  outfits: [],
  userOutfits: [],
  mostUsedCloth: null,

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
              userOutfits: action.payload
          }
      case GET_OUTFITS_BY_WEATHER:
          return {
              ...state,
              userOutfits: action.payload
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
        case COUNT_CLOTHES_IN_OUTFIT:
          return {
              ...state,
              mostUsedCloth: action.payload  
          }
        case LIKE_OUTFIT:
        case UNLIKE_OUTFIT:
            if(state.userOutfits.length !== 0){
                let userOutfitsIndex = state.userOutfits.findIndex((outfit) => outfit.id === action.payload.id);
                state.userOutfits[userOutfitsIndex].likes = action.payload.likes;
            }else{
                let allOutfitsIndex = state.outfits.findIndex((outfit) => outfit.id === action.payload.id);
                state.outfits[allOutfitsIndex].likes = action.payload.likes;
            }
            return{
                ...state,     
            }

    default: 
      return state;
  }
}