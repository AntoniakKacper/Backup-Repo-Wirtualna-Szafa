import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import {database} from '../../database/firebase';
import { ADD_CLOTH, ADD_CLOTHES_TO_DATABASE, ADD_USER_CLOTH, AppActions, CLEAR_CLOTHES, GET_ADDED_CLOTHES, REMOVE_CLOTH_FROM_LIST, REMOVE_CLOTH_FROM_USER_LIST, SET_USER_CLOTHES } from '../types/actionTypes';
import { Cloth } from '../types/clothTypes';
import { v4 as uuidv4 } from "uuid";

export const addCloth = (cloth: Cloth): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            const data: Cloth = {...cloth, id: uuidv4().toString()}
            dispatch({
                type: ADD_CLOTH,
                payload: data
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
            const ref = await database.collection("ClothesTest");
            clothes.forEach((item) => {
                ref.doc().set(item);
            })

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

export const getAddedClothes = (uId: string): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            let clothesList: Cloth[] = []
            await database.collection("ClothesTest").get().then((snapshot) => {
                snapshot.forEach((doc) => clothesList = [...clothesList, doc.data() as Cloth])
            });
            clothesList = clothesList.filter((cloth) => cloth.userId === uId);
            dispatch({
                    type: GET_ADDED_CLOTHES,
                    payload: clothesList,
                })

            
        }
        catch (error){
            console.log(error)
        }
    }
}

export const removeClothFromUserList = (cloth: Cloth): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            dispatch({
                type: REMOVE_CLOTH_FROM_USER_LIST,
                payload: cloth,
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export const setUserClothes = (clothes: Cloth[]): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            dispatch({
                type: SET_USER_CLOTHES,
                payload: clothes,
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export const addUserCloth = (cloth: Cloth): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            dispatch({
                type: ADD_USER_CLOTH,
                payload: cloth,
            })
        }
        catch (error){
            console.log(error)
        }
    }
}
