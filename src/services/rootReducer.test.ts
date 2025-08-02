import { rootReducer } from './store';
import { initialState as burgerConstructorInitialState } from './burger-constructor/constructorslice';
import { initialState as feedInitialState } from './feed/feedSlice';
import { initialState as ingredientsInitialState } from './ingredients/ingredientSlice';
import { initialState as orderInitialState } from './Order/OrderSlice';
import { initialState as profileOrdersInitialState } from './profile-orders/profileOrderSlice';
import { initialState as userInitialState } from './user/userSlice';

describe('rootReducer', () => {
    it('should return the initial state when state is undefined and action is unknown', () => {
        const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

        expect(state.burgerConstructor).toEqual(burgerConstructorInitialState);
        expect(state.feed).toEqual(feedInitialState);
        expect(state.ingredients).toEqual(ingredientsInitialState);
        expect(state.orderData).toEqual(orderInitialState);
        expect(state.profileOrder).toEqual(profileOrdersInitialState);
        expect(state.user).toEqual(userInitialState);
    });
});
