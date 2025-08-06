import { createSlice } from '@reduxjs/toolkit';
import socket from '../../socket/socket';
import { v4 as uuid } from 'uuid';

export const addColumnAndEmit = (title) => (dispatch, getState) => {
    const id = uuid();
    dispatch(addColumn({ id, title }));
    const board = getState().board;
    socket.emit('board:changed', board);
};

const initialState = {
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To Do',
            taskIds: [],
        },
    },
    tasks: {},
    onlineUsers: 0,
};

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard: (state, action) => {
            return action.payload;
        },

        moveTask: (state, action) => {
            const { sourceColId, destColId, sourceIndex, destIndex, taskId } = action.payload;

            state.columns[sourceColId].taskIds.splice(sourceIndex, 1);
            state.columns[destColId].taskIds.splice(destIndex, 0, taskId);
        },

        addColumn: (state, action) => {
            const { id, title } = action.payload;
            state.columns[id] = {
                id,
                title,
                taskIds: [],
            };
        },


        deleteColumn: (state, action) => {
            const colId = action.payload;
            state.columns[colId].taskIds.forEach((taskId) => {
                delete state.tasks[taskId];
            });
            delete state.columns[colId];
        },

        addTask: (state, action) => {
            const { columnId, title } = action.payload;
            const taskId = uuid();
            state.tasks[taskId] = {
                id: taskId,
                title,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            state.columns[columnId].taskIds.push(taskId);
        },

        deleteTask: (state, action) => {
            const { columnId, taskId } = action.payload;
            delete state.tasks[taskId];
            state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter(id => id !== taskId);
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },

    },
});

export const {
    setBoard,
    moveTask,
    addColumn,
    deleteColumn,
    addTask,
    deleteTask,
    setOnlineUsers,
} = boardSlice.actions;

export default boardSlice.reducer;
