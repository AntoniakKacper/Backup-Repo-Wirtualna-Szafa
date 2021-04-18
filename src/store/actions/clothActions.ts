import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import firebase from '../../database/firebase';
import { AppActions, SET_CLOTH } from '../types/actionTypes';
import { Cloth } from '../types/clothTypes';

export const setCloth = (data: string): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
        try{
            dispatch({
                type: SET_CLOTH,
                payload: data
            })
        }
        catch (error){
            console.log(error)
        }
    }
}
