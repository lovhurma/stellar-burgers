import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

//Регистрация пользователя
export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/register',
  async (body) => {
    const data = await registerUserApi(body);
    return data;
  }
);

//Данные о пользователе
export const getUser = createAsyncThunk('user/getuser', async () => {
  const data = await getUserApi();
  return data.user;
});

//Аутентификация пользователя
export const logoin = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/login',
  async (body) => {
    const data = await loginUserApi(body);
    return data;
  }
);

//Обновление данных пользователя
export const upDateUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'user/update',
  async (body) => {
    const data = await updateUserApi(body);
    return data;
  }
);
