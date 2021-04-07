import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { storage } from '../../database/firebase';
import { AppActions } from '../types/actionTypes';

export const setAvatar = (id: string, image: File): ThunkAction<void, RootState, null, AppActions> => {
    return async dispatch => {
      if(image !== undefined ){
        const uploadTask = storage.ref(`AvatarImages/${image.name}`).put(image);
  
        uploadTask.on("state_changed", (snapshot) => {
  
        },
        (error) => {
          console.log(error)
        },
        () => {
          
        })
      }
    }
  }