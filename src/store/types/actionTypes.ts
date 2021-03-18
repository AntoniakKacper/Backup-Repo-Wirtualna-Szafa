import { User } from './authTypes';
export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';

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

  export type AuthActionsTypes = SetUserAction | SignOutAction | SetLoadingAction | SetErrorAction | SetSuccessAction | NeedVerificationAction;

export type AppActions = AuthActionsTypes;