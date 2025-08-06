import { useEffect } from 'react';
import socket from '../socket/socket';
import { useDispatch } from 'react-redux';
import { setBoard,setOnlineUsers } from '../features/board/boardSlice';

export const useSocketSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('board:update', (newBoard) => {
      dispatch(setBoard(newBoard));
    });

    return () => {
      socket.off('board:update');
    };
  }, [dispatch]);

};

export const useSocketCount = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('users:count', (count) => {
      dispatch(setOnlineUsers(count));
    });

    return () => {
      socket.off('users:count');
    };
  }, [dispatch]);

};


