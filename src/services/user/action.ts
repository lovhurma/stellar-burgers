import { getUserApi } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Данные о пользователе
export const getUser = createAsyncThunk('user/getuser', async () => {
  const data = await getUserApi()
  return data.user
})

//Аутентификация пользователя
