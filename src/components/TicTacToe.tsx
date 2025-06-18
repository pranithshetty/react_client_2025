import React from 'react';
import useTicTacToe from '../hooks/useTicTacToe';

const TicTacToe = () => {
  const { board, handleClick, getStatusMessage, resetBoard } = useTicTacToe();
  return (
    <div className='container'>
      <div>
        <h2>{getStatusMessage()}</h2>
      </div>
      <div className='game'>
      {board.map((b, index) => {
        return (
          <button className='box' onClick={() => handleClick(index)} disabled={b !== null}>
            {b}
          </button>
        );
      })}
      </div>
      <div>
        <button onClick={resetBoard}>Rest Game</button>
      </div>
    </div>
  );
};

export default TicTacToe;
