import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { useDispatch, useSelector } from 'react-redux';
import { addColumnAndEmit, moveTask } from '../features/board/boardSlice';
import socket from '../socket/socket';
import Presence from './Presence';

const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const [colTitle, setColTitle] = useState('');

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const payload = {
      sourceColId: source.droppableId,
      destColId: destination.droppableId,
      sourceIndex: source.index,
      destIndex: destination.index,
      taskId: draggableId,
    };

    dispatch(moveTask(payload));

    // ✅ Emit only here, on user action
    const newBoard = {
      ...board,
      columns: {
        ...board.columns,
        [payload.sourceColId]: {
          ...board.columns[payload.sourceColId],
          taskIds: board.columns[payload.sourceColId].taskIds.filter(
            (id) => id !== payload.taskId
          ),
        },
        [payload.destColId]: {
          ...board.columns[payload.destColId],
          taskIds: [
            ...board.columns[payload.destColId].taskIds.slice(0, payload.destIndex),
            payload.taskId,
            ...board.columns[payload.destColId].taskIds.slice(payload.destIndex),
          ],
        },
      },
    };

    socket.emit('board:changed', newBoard);
  };

  const onAddColumn = () => {
   if (colTitle.trim()) {
      dispatch(addColumnAndEmit(colTitle));
      setColTitle('');
    }
  };

    return (
      <>
      <Presence/>
        <div className="px-4 pb-2">
          <input
            className="p-2 border rounded mr-2"
            placeholder="Column name"
            value={colTitle}
            onChange={(e) => setColTitle(e.target.value)}
          />
          <button onClick={onAddColumn} className="bg-blue-500 text-white px-3 py-1 rounded">
            Add Column
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 p-4 overflow-x-auto">
            {Object.values(board.columns).map((column) => {
              const tasks = column.taskIds.map((id) => board.tasks[id]);
              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </div>
        </DragDropContext>
      </>
    );
  };

  export default Board;
