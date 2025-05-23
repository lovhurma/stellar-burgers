import { configureStore } from '@reduxjs/toolkit';
import {
  constructorSlice,
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './constructorslice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

// Определяем ингредиенты для тестов
const ingredient1: TConstructorIngredient = {
  _id: '1',
  name: 'Test Ingredient 1',
  id: '1',
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

const ingredient2: TConstructorIngredient = {
  _id: '2',
  name: 'Test Ingredient 2',
  type: 'main',
  id: '2',
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
    const initialState = {
      bun: null,
      ingredients: [ingredient1, ingredient2],
      ingredientCounts: { '1': 1, '2': 1 }
    };
    const newState = constructorSlice.reducer(
      initialState,
      deleteIngredient('1')
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredientCounts).toEqual({ '2': 1 });
  });

  it('should move ingredient up and down', () => {
    const initialState = {
      bun: null,
      ingredients: [ingredient1, ingredient2],
      ingredientCounts: { '1': 1, '2': 1 }
    };

    const newState = constructorSlice.reducer(
      initialState,
      moveIngredientDown('1')
    );

    expect(newState.ingredients[0]._id).toEqual('2');
  });

  it('should clear the constructor', () => {
    store.dispatch(addIngredient(ingredient1));
    store.dispatch(clearConstructor());
    const state = store.getState().burgerConstructor;

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
