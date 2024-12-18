import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

//Thank для загрузки ингридиентов
export const getIngredients = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);

export interface IngredientState {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: string | null;
}

const initialState: IngredientState = {
  isLoading: false,
  ingredients: [],
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getAllIngredientsState: (state) => state,
    getIngredientsLoadingState: (state) => state.isLoading,
    getIngredientsState: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const {
  getAllIngredientsState,
  getIngredientsLoadingState,
  getIngredientsState
} = ingredientsSlice.selectors;

export const ingredientsReduser = ingredientsSlice.reducer;
