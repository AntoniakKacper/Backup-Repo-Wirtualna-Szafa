import { ADD_CLOTH, ADD_USER_CLOTH, AppActions, CLEAR_CLOTHES, DELETE_CLOTH, GET_ADDED_CLOTHES, REMOVE_CLOTH_FROM_LIST, REMOVE_CLOTH_FROM_USER_LIST, SET_USER_CLOTHES } from '../types/actionTypes';
import { ClothState } from '../types/clothTypes'

const initialState: ClothState = {
    cloth: null,
    clothesList: [],
    userClothes: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AppActions) => {
    switch(action.type){
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
                    cloth.id !== action.payload.id
                )
            }
        case GET_ADDED_CLOTHES:
            return {
                ...state,
                userClothes: action.payload,
            }
        case REMOVE_CLOTH_FROM_USER_LIST:
            return {
                ...state,
                userClothes: state.userClothes.filter((cloth) => 
                    cloth.id !== action.payload.id
                )
            }
        case SET_USER_CLOTHES:
            return {
                ...state,
                userClothes: action.payload,
            }
        case ADD_USER_CLOTH:
            return {
                ...state,
                userClothes: [...state.userClothes, action.payload],
            }
            case DELETE_CLOTH:
            return {
                ...state,
                userClothes: state.userClothes.filter((cloth) => 
                    cloth.id !== action.payload.id
                )
            }
        default:
            return state;
    }
}