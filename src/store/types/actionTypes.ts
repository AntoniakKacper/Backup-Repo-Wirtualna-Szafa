import { User } from './authTypes';
import { Cloth } from './clothTypes';
export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';

export const SET_CLOTH = "SET_CLOTH";
export const ADD_CLOTH = "ADD_CLOTH";
export const CLEAR_CLOTHES = "CLEAR_CLOTHES";
export const REMOVE_CLOTH_FROM_LIST = "REMOVE_CLOTH_FROM_LIST";
export const ADD_CLOTHES_TO_DATABASE = "ADD_CLOTHES_TO_DATABASE";
export const GET_ADDED_CLOTHES = "GET_ADDED_CLOTHES";

// AUTH ACTIONS
interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
  }
  
  interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
  }
  
  interface SignOutAction {
    type: typeof SIGN_OUT;
  }
  
  interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string | null;
  }
  
  interface NeedVerificationAction {
    type: typeof NEED_VERIFICATION;
  }
  
  interface SetSuccessAction {
    type: typeof SET_SUCCESS;
    payload: string;
  }


  // CLOTH ACTIONS
  interface SetClothAction {
    type: typeof SET_CLOTH;
    payload: Cloth;
  }

  interface AddClothAction {
    type: typeof ADD_CLOTH;
    payload: Cloth;
  }

  interface ClearClothesListAction {
    type: typeof CLEAR_CLOTHES;
  }

  interface RemoveClothFromListAction {
    type: typeof REMOVE_CLOTH_FROM_LIST;
    payload: Cloth;
  }
  interface AddClothesToDatabase {
    type: typeof ADD_CLOTHES_TO_DATABASE;
    payload: Cloth[];
  }

  interface GetAddedClothes {
    type: typeof GET_ADDED_CLOTHES;
    payload: Cloth[];
  }

  


  export type AuthActionsTypes = SetUserAction | SignOutAction | SetLoadingAction | SetErrorAction | SetSuccessAction | NeedVerificationAction;

  export type ClothActionTypes = SetClothAction | AddClothAction | ClearClothesListAction | RemoveClothFromListAction | AddClothesToDatabase | GetAddedClothes;

export type AppActions = AuthActionsTypes | ClothActionTypes;