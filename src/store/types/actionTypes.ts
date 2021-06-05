import { User } from './authTypes';
import { Cloth } from './clothTypes';
import { Outfit, MostUsedCloth } from './outfitTypes';

export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';

export const ADD_CLOTH = "ADD_CLOTH";
export const CLEAR_CLOTHES = "CLEAR_CLOTHES";
export const REMOVE_CLOTH_FROM_LIST = "REMOVE_CLOTH_FROM_LIST";
export const ADD_CLOTHES_TO_DATABASE = "ADD_CLOTHES_TO_DATABASE";
export const GET_ADDED_CLOTHES = "GET_ADDED_CLOTHES";
export const REMOVE_CLOTH_FROM_USER_LIST = "REMOVE_CLOTH_FROM_USER_LIST";
export const ADD_USER_CLOTH = "ADD_USER_CLOTH";
export const DELETE_CLOTH = "DELETE_CLOTH";


export const ADD_OUTFIT = "ADD_OUTFIT";
export const DELETE_OUTFIT = "DELETE_OUTFIT";
export const EDIT_OUTFIT = "ADD_OUTFIT";
export const GET_USER_OUTFITS = "GET_USER_OUTFITS";
export const GET_ALL_OUTFITS = "GET_ALL_OUTFITS";
export const COUNT_CLOTHES_IN_OUTFIT = "COUNT_CLOTHES_IN_OUTFIT";
export const GET_OUTFITS_BY_WEATHER = "GET_OUTFITS_BY_WEATHER";
export const LIKE_OUTFIT = "LIKE_OUTFIT";
export const UNLIKE_OUTFIT = "UNLIKE_OUTFIT";
export const GET_OUTFITS_BY_DATE = "GET_OUTFITS_BY_DATE";
export const GET_MOST_LIKABLE_OUTFIT = "GET_MOST_LIKABLE_OUTFIT";
export const FILTER_OUTFITS = "FILTER_OUTFITS";




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

  interface AddUserClothesAction {
    type: typeof ADD_USER_CLOTH;
    payload: Cloth;
  }

  interface DeleteClothAction {
    type: typeof DELETE_CLOTH;
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
  }

  interface DeleteOutfitAction {
    type: typeof DELETE_OUTFIT;
    payload: Outfit;
  }

  interface GetAllOutfitsAction {
    type: typeof GET_ALL_OUTFITS;
    payload: Outfit[];
  }

  interface CountClothesInOutfitsAction {
    type: typeof COUNT_CLOTHES_IN_OUTFIT;
    payload: MostUsedCloth;
  }

  interface GetOutfitByWeather {
    type: typeof GET_OUTFITS_BY_WEATHER;
    payload: Outfit[];
  }

  interface LikeOutfitAction {
    type: typeof LIKE_OUTFIT;
    payload: Outfit;
  }

  interface UnlikeOutfitAction {
    type: typeof UNLIKE_OUTFIT;
    payload: Outfit;
  }

  interface GetOutfitsByDateAction{
    type: typeof GET_OUTFITS_BY_DATE;
    payload: Outfit[];
  }

  interface GetMostLikableOutfit{
    type: typeof GET_MOST_LIKABLE_OUTFIT;
    payload: Outfit;
  }

  interface FilterOutfits{
    type: typeof FILTER_OUTFITS;
    //payload: string;
    payload: Outfit[];
  }

  

  export type AuthActionsTypes = SetUserAction | SignOutAction | SetLoadingAction | SetErrorAction | SetSuccessAction | NeedVerificationAction;

  export type ClothActionTypes = AddClothAction | ClearClothesListAction | RemoveClothFromListAction | AddClothesToDatabaseAction | GetAddedClothesAction | RemoveClothFromUserListAction | AddUserClothesAction | DeleteClothAction;

  export type OutfitActionTypes = AddOutfitAction | GetUserOutfitsAction | DeleteOutfitAction | GetAllOutfitsAction | CountClothesInOutfitsAction | GetOutfitByWeather | LikeOutfitAction | UnlikeOutfitAction | GetOutfitsByDateAction | GetMostLikableOutfit | FilterOutfits;

export type AppActions = AuthActionsTypes | ClothActionTypes | OutfitActionTypes;