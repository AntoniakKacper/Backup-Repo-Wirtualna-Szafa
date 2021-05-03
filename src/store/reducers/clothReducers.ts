import { ADD_CLOTH, AppActions, CLEAR_CLOTHES, GET_ADDED_CLOTHES, REMOVE_CLOTH_FROM_LIST } from '../types/actionTypes';
import { ClothState } from '../types/clothTypes'
import { SET_CLOTH } from '../types/actionTypes';

const initialState: ClothState = {
    cloth: null,
    clothesList: [],
    userClothes: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AppActions) => {
    switch(action.type){
        case SET_CLOTH:
            return {
                ...state,
                cloth: action.payload
            }
        case ADD_CLOTH:
            return {
                ...state,
                clothesList: [...state.clothesList, action.payload]
            }
        case CLEAR_CLOTHES:
            return {
                ...state,
                clothesList: []
            }
        case REMOVE_CLOTH_FROM_LIST:
            return {
                ...state,
                clothesList: state.clothesList.filter((cloth) => 
                    cloth.imageUrl !== action.payload.imageUrl
                )
            }
        case GET_ADDED_CLOTHES:
            return {
                ...state,
                userClothes: action.payload,
            }
        default:
            return state;
    }
}