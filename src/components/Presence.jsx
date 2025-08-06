import { useSelector } from 'react-redux';

function Presence() {
  const online = useSelector((state) => state.board.onlineUsers);

  return (
    <div className="text-sm text-gray-600 px-4 py-2">
      🟢 {online} user{online !== 1 ? 's' : ''} online
    </div>
  );
}

export default Presence;
