import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  upDateUser
} from './action';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface UserState {
  isLoadong: boolean;
  user: TUser | null;
  isAuthorized: boolean;
  isAuthChecked: boolean;
  error: string | null;
}

const initialState: UserState = {
  isLoadong: false,
  user: null,
  isAuthorized: false,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isAuthorizedSelector: (state) => state.isAuthorized,
    getUserErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoadong = false;
        state.error = null;
        state.user = payload.user;
        state.isAuthorized = true;
        state.isAuthChecked = true;
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(getUser.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoadong = false;
        state.error = null;
        state.isAuthorized = true;
        state.isAuthChecked = true;
        state.user = payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoadong = false;
        state.error = null;
        state.user = payload.user;
        state.isAuthorized = true;
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoadong = false;
        state.error = null;
        state.user = null;
        state.isAuthorized = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(upDateUser.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(upDateUser.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(upDateUser.fulfilled, (state, { payload }) => {
        state.isLoadong = false;
        state.error = null;
        state.user = payload.user;
        state.isAuthorized = true;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoadong = false;
        state.error = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoadong = false;
        state.error = null;
      });
  }
});

export { initialState as userInitialState };
export const {
  getUserSelector,
  isAuthCheckedSelector,
  isAuthorizedSelector,
  getUserErrorSelector
} = userSlice.selectors;
