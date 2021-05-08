import { ThunkAction } from "redux-thunk"
import { RootState } from ".."
import { Cloth } from "../../components/styledComponents/FavoritesStyles"
import { database } from "../../database/firebase"
import { ADD_OUTFIT, AppActions, DELETE_OUTFIT, GET_USER_OUTFITS } from "../types/actionTypes"
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

export const deleteOutfit = (outfit: Outfit): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            let outfitId;
            const outfitRef = database.collection("Outfits")
            await outfitRef.where("id", "==", outfit.id).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    outfitId = doc.id as string;
                });
            });
            outfitRef.doc(outfitId).delete();
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