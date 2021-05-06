import { ThunkAction } from "redux-thunk"
import { RootState } from ".."
import { database } from "../../database/firebase"
import { ADD_OUTFIT, AppActions, GET_USER_OUTFITS } from "../types/actionTypes"
import { Outfit } from "../types/outfitTypes"

export const addOutfit = (outfit: Outfit): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            const ref = await database.collection("Outfits");
            ref.doc().set(outfit);


            dispatch({
                type: ADD_OUTFIT,
                payload: outfit,
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