import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk('user/register', registerUserApi);

//Данные о пользователе
export const getUser = createAsyncThunk('user/getuser', async () => {
  const data = await getUserApi();
  return data;
});

//Аутентификация пользователя
export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/login',
  async (body) => {
    const data = await loginUserApi(body);
    return data;
  }
);

//Выход пользователя из приложения
export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

//Обновление данных пользователя
export const upDateUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'user/update',
  async (body) => {
    const data = await updateUserApi(body);
    return data;
  }
);
