import { User } from './authTypes';
import { Cloth } from './clothTypes';
import { Outfit } from './outfitTypes';
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
export const REMOVE_CLOTH_FROM_USER_LIST = "REMOVE_CLOTH_FROM_USER_LIST";
export const SET_USER_CLOTHES = "SET_USER_CLOTHES";
export const ADD_USER_CLOTH = "ADD_USER_CLOTH";

export const ADD_OUTFIT = "ADD_OUTFIT";
export const DELETE_OUTFIT = "ADD_OUTFIT";
export const EDIT_OUTFIT = "ADD_OUTFIT";
export const GET_USER_OUTFITS = "GET_USER_OUTFITS";


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
  interface AddClothesToDatabaseAction {
    type: typeof ADD_CLOTHES_TO_DATABASE;
    payload: Cloth[];
  }

  interface GetAddedClothesAction {
    type: typeof GET_ADDED_CLOTHES;
    payload: Cloth[];
  }

  interface RemoveClothFromUserListAction {
    type: typeof REMOVE_CLOTH_FROM_USER_LIST;
    payload: Cloth;
  }

  interface SetUserClothesAction {
    type: typeof SET_USER_CLOTHES;
    payload: Cloth[];
  }

  interface AddUserClothesAction {
    type: typeof ADD_USER_CLOTH;
    payload: Cloth;
  }

  // OUTFIT ACTIONS

  interface AddOutfitAction {
    type: typeof ADD_OUTFIT;
    payload: Outfit;
  }

  interface GetUserOutfitsAction {
    type: typeof GET_USER_OUTFITS;
    payload: Outfit[];
    //payload: string;
  }
  


  export type AuthActionsTypes = SetUserAction | SignOutAction | SetLoadingAction | SetErrorAction | SetSuccessAction | NeedVerificationAction;

  export type ClothActionTypes = SetClothAction | AddClothAction | ClearClothesListAction | RemoveClothFromListAction | AddClothesToDatabaseAction | GetAddedClothesAction | RemoveClothFromUserListAction | SetUserClothesAction | AddUserClothesAction;

  export type OutfitActionTypes = AddOutfitAction | GetUserOutfitsAction;

export type AppActions = AuthActionsTypes | ClothActionTypes | OutfitActionTypes;