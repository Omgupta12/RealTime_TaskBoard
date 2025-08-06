import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/board/boardSlice';
import socket from '../socket/socket';
import { store } from '../app/store';

const TaskCard = ({ task, index, columnId }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteTask({ taskId: task.id, columnId }));
    socket.emit('board:changed', store.getState().board);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="bg-gray-100 p-2 rounded shadow-sm text-sm flex justify-between items-center"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.title}
          <button onClick={onDelete} className="text-red-500 ml-2 text-xs">✕</button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
