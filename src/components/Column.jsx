import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { useDispatch } from 'react-redux';
import { addTask, deleteColumn } from '../features/board/boardSlice';
import socket from '../socket/socket';
import { store } from '../app/store';

const Column = ({ column, tasks }) => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState('');

  const onAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTask({ columnId: column.id, title: taskTitle }));
      socket.emit('board:changed', store.getState().board);
      setTaskTitle('');
    }
  };

  const onDeleteColumn = () => {
    if (confirm('Delete this column and all tasks?')) {
      dispatch(deleteColumn(column.id));
      socket.emit('board:changed', store.getState().board);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-64">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-bold">{column.title}</h2>
        <button onClick={onDeleteColumn} className="text-red-500">✕</button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="min-h-[50px] space-y-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} columnId={column.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="mt-2">
        <input
          className="p-1 border w-full text-sm mb-1"
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button
          onClick={onAddTask}
          className="text-xs bg-green-500 text-white px-2 py-1 w-full rounded"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Column;
