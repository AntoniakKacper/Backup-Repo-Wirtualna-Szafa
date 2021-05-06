  
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducers';
import clothReducers from './reducers/clothReducers';
import outfitReducers from './reducers/outfitReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  cloth: clothReducers,
  outfit: outfitReducers
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;