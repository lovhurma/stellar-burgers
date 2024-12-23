import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
