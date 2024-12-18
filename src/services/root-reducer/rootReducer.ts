import { combineReducers } from 'redux';
import { ingredientsReduser } from '../slices/ingredientSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReduser
});
