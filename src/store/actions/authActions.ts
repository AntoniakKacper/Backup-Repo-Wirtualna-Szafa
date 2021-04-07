import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import firebase from '../../database/firebase';
import { AppActions, NEED_VERIFICATION, SET_ERROR, SET_LOADING, SET_SUCCESS, SET_USER, SIGN_OUT } from '../types/actionTypes';
import { SignInData, SignUpData, User } from '../types/authTypes';


// Create user
export const signup = (data: SignUpData, onError: () => void): ThunkAction<void, RootState, null, AppActions> => {
  return async dispatch => {
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
      if(result.user) {
        const userData: User = {
          username: data.username,
          email: data.email,
          id: result.user.uid,
          imageUrl: ''
        };
        await firebase.firestore().collection('/Users').doc(result.user.uid).set(userData);
        await result.user.sendEmailVerification();
        dispatch({
          type: NEED_VERIFICATION
        });
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (err) {
      onError();
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  }
}

// Get user by id
export const getUserById = (id: string): ThunkAction<void, RootState, null, AppActions> => {
  return async dispatch => {
    try {
      const user = await firebase.firestore().collection('Users').doc(id).get();
      if(user.exists) {
        const userData = user.data() as User;
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

// Set loading
export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AppActions> => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: value
    });
  }
}

// Log in
export const signin = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AppActions> => {
  return async dispatch => {
    try {
      await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      onError();
      dispatch(setError(err.message));
    }
  }
}

// Log out
export const signout = (): ThunkAction<void, RootState, null, AppActions> => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      await firebase.auth().signOut();
      dispatch({
        type: SIGN_OUT
      });
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  }
}

// Set error
export const setError = (msg: string | null): ThunkAction<void, RootState, null, AppActions> => {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: msg
    });
  }
}

// Set need verification
export const setNeedVerification = (): ThunkAction<void, RootState, null, AppActions> => {
  return dispatch => {
    dispatch({
      type: NEED_VERIFICATION
    });
  }
}

// Set success
export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AppActions> => {
  return dispatch => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg
    });
  }
}

// Send password reset email
export const sendPasswordResetEmail = (email: string, successMsg: string): ThunkAction<void, RootState, null, AppActions> => {
  return async dispatch => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch(setSuccess(successMsg));
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  }
}





