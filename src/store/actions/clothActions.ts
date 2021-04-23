import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import firebase, {database} from '../../database/firebase';
import { ADD_CLOTH, ADD_CLOTHES_TO_DATABASE, AppActions, CLEAR_CLOTHES, REMOVE_CLOTH_FROM_LIST, SET_CLOTH } from '../types/actionTypes';
import { Cloth } from '../types/clothTypes';

export const setCloth = (cloth: Cloth): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            dispatch({
                type: SET_CLOTH,
                payload: cloth
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export const addCloth = (cloth: Cloth): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            dispatch({
                type: ADD_CLOTH,
                payload: cloth
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export const clearClothesList = (): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            dispatch({
                type: CLEAR_CLOTHES,
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export const removeClothFromList = (clothFromList: Cloth): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            dispatch({
                type: REMOVE_CLOTH_FROM_LIST,
                payload: clothFromList,
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export const addClothesToDatabase = (clothes: Cloth[]): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            const ref = await database.collection("Clothes").doc("AllClothes");
            (clothes.map((cloth) => 
                ref.update("ClothesList", firebase.firestore.FieldValue.arrayUnion(cloth))
            ));

            dispatch({
                type: ADD_CLOTHES_TO_DATABASE,
                payload: clothes,
            })
        }
        catch (error){
            console.log(error)
        }
    }
}
