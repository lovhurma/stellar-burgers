import { userSlice, initialState } from './userSlice';
import {
  registerUser,
  getUser,
  loginUser,
  logoutUser,
  upDateUser
} from './action';

describe('userSlice', () => {
  it('should return the initial state when called with an empty action', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle registerUser.pending', () => {
    const result = userSlice.reducer(
      initialState,
      registerUser.pending('', {
        email: 'test@test.com',
        password: 'password',
        name: 'Test User'
      })
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: true,
      error: null
    });
  });

  it('should handle registerUser.fulfilled', () => {
    const payload = {
      success: true,
      user: { email: 'test@test.com', name: 'Test User' },
      accessToken: 'token',
      refreshToken: 'refresh'
    };
    const result = userSlice.reducer(
      initialState,
      registerUser.fulfilled(payload, '', {
        email: 'test@test.com',
        password: 'password',
        name: 'Test User'
      })
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: false,
      user: payload.user,
      isAuthorized: true,
      error: null
    });
  });

  it('should handle registerUser.rejected', () => {
    const error = new Error('Error');
    const result = userSlice.reducer(
      initialState,
      registerUser.rejected(error, '', {
        email: 'test@test.com',
        password: 'password',
        name: 'Test User'
      })
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: false,
      error: error.message
    });
  });

  it('should handle getUser.pending', () => {
    const result = userSlice.reducer(
      initialState,
      getUser.pending('', undefined)
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: true,
      error: null
    });
  });

  it('should handle getUser.fulfilled', () => {
    const payload = {
      success: true,
      user: { email: 'test@test.com', name: 'Test User' }
    };
    const result = userSlice.reducer(
      initialState,
      getUser.fulfilled(payload, '', undefined)
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: false,
      user: payload.user,
      isAuthorized: true,
      error: null
    });
  });

  it('should handle getUser.rejected', () => {
    const error = new Error('Error');
    const result = userSlice.reducer(
      initialState,
      getUser.rejected(error, '', undefined)
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: false,
      error: error.message
    });
  });

  it('should handle loginUser.pending', () => {
    const result = userSlice.reducer(
      initialState,
      loginUser.pending('', { email: 'test@test.com', password: 'password' })
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: true,
      error: null
    });
  });

  it('should handle loginUser.fulfilled', () => {
    const payload = {
      success: true,
      user: { email: 'test@test.com', name: 'Test User' },
      accessToken: 'token',
      refreshToken: 'refresh'
    };
    const result = userSlice.reducer(
      initialState,
      loginUser.fulfilled(payload, '', {
        email: 'test@test.com',
        password: 'password'
      })
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: false,
      user: payload.user,
      isAuthorized: true,
      error: null
    });
  });

  it('should handle loginUser.rejected', () => {
    const error = new Error('Error');
    const result = userSlice.reducer(
      initialState,
      loginUser.rejected(error, '', {
        email: 'test@test.com',
        password: 'password'
      })
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: false,
      error: error.message
    });
  });

  it('should handle logoutUser.fulfilled', () => {
    const result = userSlice.reducer(
      {
        ...initialState,
        isAuthorized: true,
        user: { email: 'test@test.com', name: 'Test User' }
      },
      logoutUser.fulfilled(undefined, '', undefined)
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: false,
      user: null,
      isAuthorized: false
    });
  });

  it('should handle upDateUser.fulfilled', () => {
    const payload = {
      success: true,
      user: { email: 'updated@test.com', name: 'Updated User' }
    };
    const result = userSlice.reducer(
      initialState,
      upDateUser.fulfilled(payload, '', {
        email: 'test@test.com',
        password: 'password',
        name: 'Test User'
      })
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: false,
      user: payload.user,
      isAuthorized: true,
      error: null
    });
  });

  it('should handle upDateUser.rejected', () => {
    const error = new Error('Error');
    const result = userSlice.reducer(
      initialState,
      upDateUser.rejected(error, '', {
        email: 'test@test.com',
        password: 'password',
        name: 'Test User'
      })
    );
    expect(result).toEqual({
      ...initialState,
      isLoadong: false,
      error: error.message
    });
  });
});
