import { ThunkAction } from "redux-thunk"
import { RootState } from ".."
import { database } from "../../database/firebase"
import { ADD_OUTFIT, AppActions } from "../types/actionTypes"
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