import React, { useState } from 'react';

function inetialBoardState() {
  return Array(9).fill(null);
}

const WINNING_PATTERN = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const useTicTacToe = () => {
  const [board, setBoard] = useState(inetialBoardState());
  const [isXNext, setIsXNext] = useState(true);

  function handleClick(index: number) {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function calculateWinner(currentBoard: any[]) {
    for (let i = 0; i < WINNING_PATTERN.length; i++) {
      const [a, b, c] = WINNING_PATTERN[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  }

  function getStatusMessage():string {
    const winner = calculateWinner(board);

    if (winner) {
      return `winner is ${winner}`;
    } else if (!board.includes(null)) {
      return `Its a draw`;
    } else {
      return isXNext ? 'X turn' : 'O turn';
    }
  }

  function resetBoard() {
    setBoard(inetialBoardState());
  }

  return { board, getStatusMessage, isXNext, resetBoard, handleClick };
};

export default useTicTacToe;
