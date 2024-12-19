import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

//Thank для загрузки ингридиентов
export const getIngredients = createAsyncThunk('ingredients/get', async () =>
  getIngredientsApi()
);
