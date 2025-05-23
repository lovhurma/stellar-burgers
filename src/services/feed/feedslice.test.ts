import { configureStore } from '@reduxjs/toolkit';
import { IFeedState } from './feedSlice';
import { getFeeds } from './action';
import { getFeedsApi } from '@api';
import { feedReducer } from './feedSlice';

jest.mock('@api'); // Мокаем API для предотвращения реальных запросов.

type RootState = {
  feed: IFeedState;
};

describe('feedSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>;
  const initialState: IFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: true,
    error: null,
  };

  beforeEach(() => {
    store = configureStore({ reducer: { feed: feedReducer } }); // Создаем новый store перед каждым тестом.
  });

  it('should return the initial state', () => {
    const state = store.getState().feed;
    expect(state).toEqual(initialState);
  });

  it('should handle getFeeds.pending', () => {
    store.dispatch(getFeeds.pending('someRequestId'));
    const state = store.getState().feed;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getFeeds.fulfilled', async () => {
    const mockFeedsResponse = {
      orders: [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }],
      total: 2,
      totalToday: 1,
    };

    // Устанавливаем возврат функции мока для getFeedsApi
    (getFeedsApi as jest.Mock).mockResolvedValueOnce(mockFeedsResponse);

    const action = await store.dispatch(getFeeds()); // Вызываем асинхронный thunk.
    const state = store.getState().feed;

    expect(action.type).toBe(getFeeds.fulfilled.type); // Проверяем, что тип действия - fulfilled.
    expect(state.orders).toEqual(mockFeedsResponse.orders); // Проверяем, что нужные заказы были сохранены.
    expect(state.total).toBe(mockFeedsResponse.total); // Проверяем, что общее количество заказов правильно обновлено.
    expect(state.totalToday).toBe(mockFeedsResponse.totalToday); // Проверяем, что общее количество заказы на сегодня правильно обновлено.
    expect(state.isLoading).toBe(false); // Проверяем, что состояние загрузки изменилось на false.
    expect(state.error).toBe(null); // Проверяем, что ошибка равна null.
  });

  it('should handle getFeeds.rejected', async () => {
    const mockErrorMessage = "Ошибка загрузки данных";
    (getFeedsApi as jest.Mock).mockRejectedValueOnce(new Error(mockErrorMessage)); // Имитация ошибки при загрузке.

    const action = await store.dispatch(getFeeds()); // Вызываем асинхронный thunk.
    const state = store.getState().feed;

    expect(action.type).toBe(getFeeds.rejected.type); // Проверяем, что тип действия - rejected.
    expect(state.isLoading).toBe(false); // Проверяем, что состояние загрузки изменилось на false.
    expect(state.error).toBe(mockErrorMessage); // Проверяем, что ошибка соответствует ожидаемому.
  });
});
