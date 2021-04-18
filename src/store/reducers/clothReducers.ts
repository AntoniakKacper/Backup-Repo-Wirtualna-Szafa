import { AppActions } from '../types/actionTypes';
import { ClothState } from '../types/clothTypes'
import { SET_CLOTH } from '../types/actionTypes';

const initialState: ClothState = {
    cloth: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AppActions) => {
    switch(action.type){
        case SET_CLOTH:
            return {
                ...state,
                value: action.payload
            }
        default:
            return state;
    }
}