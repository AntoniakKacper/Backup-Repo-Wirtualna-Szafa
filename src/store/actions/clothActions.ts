import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import firebase, {database} from '../../database/firebase';
import { ADD_CLOTH, ADD_CLOTHES_TO_DATABASE, ADD_USER_CLOTH, AppActions, CLEAR_CLOTHES, GET_ADDED_CLOTHES, REMOVE_CLOTH_FROM_LIST, REMOVE_CLOTH_FROM_USER_LIST, SET_CLOTH, SET_USER_CLOTHES } from '../types/actionTypes';
import { Cloth } from '../types/clothTypes';
import { v4 as uuidv4 } from "uuid";

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

export const getAddedClothes = (userId: string): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            const ListOfClothes: Cloth[] = [];
            let UserClothes: Cloth[] = [];
            const ref = await database.collection("Clothes").doc("AllClothes");
            ref.get().then(queryResult => {
                const category = queryResult.data()?.ClothesList;
                category &&
                category.map((item: any) => {
                    const cloth = JSON.parse(JSON.stringify(item));
                    ListOfClothes.push(cloth);
                })
                UserClothes = ListOfClothes.filter((cloth) => cloth.userId === userId)
                dispatch({
                    type: GET_ADDED_CLOTHES,
                    payload: UserClothes,
                })
            
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
