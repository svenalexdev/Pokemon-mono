function MoveSelector({ moves, onSelectMove, isLocked }) {
  return (
    <div className="flex flex-wrap gap-2">
      {moves.map(move => (
        <button
          key={move.name}
          onClick={() => onSelectMove(move)}
          disabled={isLocked}
          className={`px-4 py-2 border rounded ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
        >
          {move.name}
        </button>
      ))}
    </div>
  );
}

export default MoveSelector;
