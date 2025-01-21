import { configureStore } from '@reduxjs/toolkit';
import {
  constructorSlice,
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './constructorslice';
import { TIngredient } from '@utils-types';

// Mock для uuid
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid')
}));

// Определяем ингредиенты для тестов
const ingredient1: TIngredient = {
  _id: '1',
  name: 'Test Ingredient 1',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 50,
  image: 'image1',
  image_large: 'image_large1',
  image_mobile: 'image_mobile1'
};

const ingredient2: TIngredient = {
  _id: '2',
  name: 'Test Ingredient 2',
  type: 'main',
  proteins: 15,
  fat: 7,
  carbohydrates: 25,
  calories: 120,
  price: 60,
  image: 'image2',
  image_large: 'image_large2',
  image_mobile: 'image_mobile2'
};

// Настройка тестового хранилища
const setUpStore = () => {
  return configureStore({
    reducer: {
      burgerConstructor: constructorSlice.reducer
    }
  });
};

type StoreType = ReturnType<typeof setUpStore>;

describe('constructorSlice', () => {
  let store: StoreType;

  beforeEach(() => {
    store = setUpStore();
  });

  it('should initialize with the correct initial state', () => {
    const state = store.getState().burgerConstructor;
    expect(state).toEqual({
      bun: null,
      ingredients: [],
      ingredientCounts: {}
    });
  });

  it('should handle addIngredient action', () => {
    store.dispatch(addIngredient(ingredient1));
    const state = store.getState().burgerConstructor;

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toEqual('1');
    expect(state.ingredientCounts['1']).toEqual(1);
  });

  it('should handle deleteIngredient action', () => {
    store.dispatch(addIngredient(ingredient1));
    store.dispatch(addIngredient(ingredient2));

    store.dispatch(deleteIngredient('1'));
    const state = store.getState().burgerConstructor;

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredientCounts).toEqual({ '2': 1 });
  });

  it('should move ingredient up and down', () => {
    store.dispatch(addIngredient(ingredient1));
    store.dispatch(addIngredient(ingredient2));

    store.dispatch(moveIngredientUp('2'));
    let state = store.getState().burgerConstructor;
    expect(state.ingredients[0]._id).toEqual('2');

    store.dispatch(moveIngredientDown('1'));
    state = store.getState().burgerConstructor;
    expect(state.ingredients[1]._id).toEqual('1');
  });

  it('should clear the constructor', () => {
    store.dispatch(addIngredient(ingredient1));
    store.dispatch(clearConstructor());
    const state = store.getState().burgerConstructor;

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
