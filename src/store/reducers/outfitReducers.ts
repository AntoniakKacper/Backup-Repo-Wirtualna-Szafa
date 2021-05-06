import { ADD_OUTFIT, AppActions, GET_USER_OUTFITS } from '../types/actionTypes';
import { OutfitState } from '../types/outfitTypes';

const initialState: OutfitState = {
  outfit: null,
  userOutfits: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AppActions) => {
  switch(action.type) {
    case ADD_OUTFIT:
        return {
            ...state,
            outfit: action.payload
        }
      case GET_USER_OUTFITS:
          return {
              ...state,
              userOutfits: action.payload
          }

    default: 
      return state;
  }
}