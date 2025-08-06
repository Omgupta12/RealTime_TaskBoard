import React from 'react';
import Board from './components/Board';
import { useSocketSync,useSocketCount } from './hooks/useSocketSync';

const App = () => {
  useSocketSync();
  useSocketCount();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center py-4"> Real-Time Task Board</h1>
      <Board />
    </div>
  );
};

export default App;
