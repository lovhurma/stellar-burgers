import { ingredientsSlice } from './ingredientSlice'; 
import { getIngredients } from './actions'
import { TIngredient } from '@utils-types'; 

// Заготовка моковых данных
const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Ingredient 1',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 50,
    image: 'image1.png',
    image_large: 'image1_large.png',
    image_mobile: 'image1_mobile.png',
  },
  {
    _id: '2',
    name: 'Ingredient 2',
    type: 'main',
    proteins: 15,
    fat: 25,
    carbohydrates: 35,
    calories: 45,
    price: 55,
    image: 'image2.png',
    image_large: 'image2_large.png',
    image_mobile: 'image2_mobile.png',
  },
];

describe('ingredientsSlice', () => {
  const initialState = {
    isLoading: false,
    ingredients: [],
    error: null,
  };

  it('should handle initial state', () => {
    expect(ingredientsSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it('should handle getIngredients.fulfilled', () => {
    const action = { type: getIngredients.fulfilled.type, payload: mockIngredients };
    const state = ingredientsSlice.reducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      isLoading: false,
      ingredients: mockIngredients,
      error: null,
    });
  });

  it('should handle getIngredients.rejected', () => {
    const action = { type: getIngredients.rejected.type, error: { message: 'Error fetching ingredients' } };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      isLoading: false,
      ingredients: [],
      error: 'Error fetching ingredients',
    });
  });
});
