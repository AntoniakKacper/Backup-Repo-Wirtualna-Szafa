import { ADD_OUTFIT, AppActions } from '../types/actionTypes';
import { OutfitState } from '../types/outfitTypes';

const initialState: OutfitState = {
  outfit: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AppActions) => {
  switch(action.type) {
    case ADD_OUTFIT:
        return {
            ...state,
            outfit: action.payload
        }

    default: 
      return state;
  }
}