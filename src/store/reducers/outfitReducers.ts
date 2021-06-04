import { ADD_OUTFIT, AppActions, COUNT_CLOTHES_IN_OUTFIT, DELETE_OUTFIT, GET_ALL_OUTFITS, GET_MOST_LIKABLE_OUTFIT, GET_OUTFITS_BY_DATE, GET_OUTFITS_BY_WEATHER, GET_USER_OUTFITS, LIKE_OUTFIT, UNLIKE_OUTFIT } from '../types/actionTypes';
import { OutfitState } from '../types/outfitTypes';

const initialState: OutfitState = {
  outfits: [],
  mostUsedCloth: null,
  calendarOutfits: [],
  userOutfits: [],
  mostLikableOutfit: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AppActions) => {
  
  switch(action.type) {
    case ADD_OUTFIT:
        return {
            ...state,
            outfits: [action.payload, ...state.outfits]
        }
    
    case GET_ALL_OUTFITS:
    case GET_OUTFITS_BY_WEATHER:
        return {
            ...state,
            outfits: action.payload
        }
    case GET_USER_OUTFITS:
        return {
            ...state,
            userOutfits: action.payload
        }
    case GET_OUTFITS_BY_DATE:
        return {
            ...state,
            calendarOutfits: action.payload
        }
    case DELETE_OUTFIT:
        return {
            ...state,
            outfits: state.outfits.filter((outfit) => outfit.id !== action.payload.id)
        }
    case COUNT_CLOTHES_IN_OUTFIT:
        return {
            ...state,
            mostUsedCloth: action.payload  
        }
    case LIKE_OUTFIT:
    case UNLIKE_OUTFIT:
        let index = state.outfits.findIndex((outfit) => outfit.id === action.payload.id);
        state.outfits[index].likes = action.payload.likes;
        return{
            ...state,     
        }
    case GET_MOST_LIKABLE_OUTFIT:
        return{
            ...state,
            mostLikableOutfit: action.payload
        }
    default: 
        return state;
  }
}