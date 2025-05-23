import { profileOrderSlice } from './profileOrderSlice';
import { getProfileOrder } from './action';

const { reducer } = profileOrderSlice;

// Заготовка моковых данных
const mockOrders = [
  {
    _id: '1',
    status: 'done',
    name: 'Order 1',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 1,
    ingredients: ['ingredient1', 'ingredient2']
  },
  {
    _id: '2',
    status: 'pending',
    name: 'Order 2',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 2,
    ingredients: ['ingredient3', 'ingredient4']
  }
];

describe('profileOrderSlice', () => {
  it('should return the initial state when the state is undefined', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      orders: [],
      isLoading: true,
      error: null
    });
  });

  it('should handle pending state', () => {
    const requestId = 'test-request-id';
    const result = reducer(undefined, getProfileOrder.pending(requestId));
    expect(result).toEqual({
      orders: [],
      isLoading: true,
      error: null
    });
  });

  it('should handle fulfilled state', () => {
    const requestId = 'test-request-id';
    const result = reducer(
      undefined,
      getProfileOrder.fulfilled(mockOrders, requestId)
    );
    expect(result).toEqual({
      orders: mockOrders,
      isLoading: false,
      error: null
    });
  });

  it('should handle rejected state', () => {
    const requestId = 'test-request-id';
    const errorMessage = 'Failed to fetch orders';
    const result = reducer(
      undefined,
      getProfileOrder.rejected(new Error(errorMessage), requestId)
    );
    expect(result).toEqual({
      orders: [],
      isLoading: false,
      error: errorMessage
    });
  });
});
