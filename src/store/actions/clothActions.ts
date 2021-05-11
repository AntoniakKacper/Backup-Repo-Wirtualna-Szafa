import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import {database} from '../../database/firebase';
import { ADD_CLOTH, ADD_CLOTHES_TO_DATABASE, ADD_USER_CLOTH, AppActions, CLEAR_CLOTHES, DELETE_CLOTH, GET_ADDED_CLOTHES, REMOVE_CLOTH_FROM_LIST, REMOVE_CLOTH_FROM_USER_LIST, SET_USER_CLOTHES } from '../types/actionTypes';
import { Cloth } from '../types/clothTypes';



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
            const ref = await database.collection("Clothes");
            clothes.forEach((item) => {
                const docRef = ref.doc()
                docRef.set({...item, id: docRef.id})
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
            await database.collection("Clothes").get().then((snapshot) => {
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

export const deleteCloth = (cloth: Cloth): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            //Delete cloth
            const clothRef = await database.collection("Clothes");
            clothRef.doc(cloth.id).delete();

            //Delete outfits that contains deleted cloth
            const ref = await database.collection("Outfits");
            ref.get().then((snapshot) => {
                snapshot.forEach((doc) => 
                {
                    let equalId = doc.data()["clothesList"].map((list: Cloth) => list).find((item: Cloth) => item.id === cloth.id);
                    equalId && ref.doc(doc.id).delete();
                }
                   
                ) 
            });
            dispatch({
                type: DELETE_CLOTH,
                payload: cloth,
            })
        }
        catch (error){
            console.log(error)
        }
    }
}


