import io, { Socket } from 'socket.io-client';
import { Dispatch } from 'react';
import { Action, Order } from '../context/reducer';

type UpdateData = {
  orders: Order[];
};

type SubscribeToOrders = (username: string, dispatch: Dispatch<Action>) => Socket;

export const subscribeToOrders: SubscribeToOrders = (username, dispatch) => {
  const socket = io('/');

  socket.on(`update-${username}`, ({ orders }: UpdateData) => {
    dispatch({ type: 'set-orders', payload: orders });
  });

  return socket;
};