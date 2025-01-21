import { orderSlice, clearOrderModalData } from './orderSlice';
import { fetchOrder } from './actions'

describe('orderSlice', () => {
  const initialState = {
    orderData: null,
    orderRequest: false,
  };

  // Заготовка моковых данных
  const mockOrder = {
    _id: '1',
    status: 'done',
    name: 'Order 1',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 1,
    ingredients: ['ingredient1', 'ingredient2'],
  };

  it('should return the initial state when the state is undefined', () => {
    const result = orderSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
});

  it('should handle fetchOrder.pending', () => {
    const action = { type: fetchOrder.pending.type };
    const result = orderSlice.reducer(initialState, action);
    expect(result.orderRequest).toBe(true);
  });

  it('should handle fetchOrder.fulfilled', () => {
    const action = { type: fetchOrder.fulfilled.type, payload: mockOrder };
    const result = orderSlice.reducer(initialState, action);
    expect(result.orderData).toEqual(mockOrder);
    expect(result.orderRequest).toBe(false); // Проверяем, что запрос завершен
  });

  it('should handle clearOrderModalData', () => {
    const stateWithOrder = {
      orderData: mockOrder,
      orderRequest: false,
    };

    const action = { type: clearOrderModalData.type };
    const result = orderSlice.reducer(stateWithOrder, action);
    
    expect(result.orderData).toBeNull(); // Проверяем, что данные очищены
  });
});
