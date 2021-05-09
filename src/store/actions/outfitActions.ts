import { ThunkAction } from "redux-thunk"
import { RootState } from ".."
import { Cloth } from "../../components/styledComponents/FavoritesStyles"
import { database } from "../../database/firebase"
import { ADD_OUTFIT, AppActions, DELETE_OUTFIT, GET_ALL_OUTFITS, GET_USER_OUTFITS } from "../types/actionTypes"
import { Outfit } from "../types/outfitTypes"
import { v4 as uuidv4 } from "uuid";

export const addOutfit = (outfit: Outfit): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            const data: Outfit = {...outfit, id: uuidv4().toString()}
            const ref = await database.collection("Outfits");
            ref.doc().set(outfit);
            dispatch({
                type: ADD_OUTFIT,
                payload: data,
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export const getUserOutfits = (uId: string): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            let listOfOutfits: Outfit[] = []
            await database.collection("Outfits").get().then((snapshot) => {
                snapshot.forEach((doc) => listOfOutfits = [...listOfOutfits, doc.data() as Outfit])
            });

            listOfOutfits = listOfOutfits.filter((outfit) => outfit.userId === uId);
            dispatch({
                type: GET_USER_OUTFITS,
                payload: listOfOutfits,
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export const deleteOutfit = (outfit: Outfit): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            const outfitRef = database.collection("Outfits")
            await outfitRef.where("id", "==", outfit.id).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    outfitRef.doc(doc.id).delete();
                });
            });
            dispatch({
                type: DELETE_OUTFIT,
                payload: outfit,
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export const getAllOutfits = (): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            let listOfOutfits: Outfit[] = []
            await database.collection("Outfits").get().then((snapshot) => {
                snapshot.forEach((doc) => listOfOutfits = [...listOfOutfits, doc.data() as Outfit])
                
            });
            dispatch({
                type: GET_ALL_OUTFITS,
                payload: listOfOutfits,
            })
            
        }
        catch (error){
            console.log(error)
        }
    }
}