import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrderModalData,
  getOrderModalData,
  getOrderRequest
} from '../../services/order/orderSlice';
import { fetchOrder } from '../../services/order/actions';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  // const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector((state) => state.burgerConstructor) || {
    bun: null,
    ingredients: []
  };

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    // if (!isAuthChecked) {
    //   navigate('/login');
    //   return;
    // }
    if (!user) {
      navigate('/login');
      return;
    }

    const ingredientDataId = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (ingredient: TConstructorIngredient) => ingredient._id
      ),
      constructorItems.bun._id
    ];
    dispatch(fetchOrder(ingredientDataId));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
