import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  // getFeedsInfo,
  getOrdersFeeds,
  getTotalFeeds,
  getTotalTodayFeeds
} from '../../services/feed/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector(getOrdersFeeds);
  console.log(orders);
  const total = useSelector(getTotalFeeds);
  console.log(total);
  const totalToday = useSelector(getTotalTodayFeeds);
  const feed = {
    total: total,
    totalToday: totalToday
  };
  // const feed = useSelector(getFeedsInfo);

  // console.log(feed);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
