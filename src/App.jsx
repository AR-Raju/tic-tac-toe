// Game
//   -> Board
//     -> Square
//   -> History

/* eslint-disable no-unused-vars */

import React, { useState } from "react";
// eslint-disable-next-line react/prop-types
function Square({ value, handleSquareValue }) {
  return (
    <button
      className="bg-white border bordr-gray-500 h-12 w-12 m-1 leading-9 text-lg"
      onClick={handleSquareValue}
    >
      {value}
    </button>
  );
}

// eslint-disable-next-line react/prop-types
function Board({ squares, xIsNext, onPlay }) {
  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  const handleSquareValue = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // eslint-disable-next-line react/prop-types
    const newSquare = squares?.slice();
    if (xIsNext) {
      newSquare[i] = "X";
    } else {
      newSquare[i] = "O";
    }
    onPlay(newSquare);
  };
  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square
          value={squares[0]}
          handleSquareValue={() => handleSquareValue(0)}
        />
        <Square
          value={squares[1]}
          handleSquareValue={() => handleSquareValue(1)}
        />
        <Square
          value={squares[2]}
          handleSquareValue={() => handleSquareValue(2)}
        />
      </div>
      <div className="flex">
        <Square
          value={squares[3]}
          handleSquareValue={() => handleSquareValue(3)}
        />
        <Square
          value={squares[4]}
          handleSquareValue={() => handleSquareValue(4)}
        />
        <Square
          value={squares[5]}
          handleSquareValue={() => handleSquareValue(5)}
        />
      </div>
      <div className="flex">
        <Square
          value={squares[6]}
          handleSquareValue={() => handleSquareValue(6)}
        />
        <Square
          value={squares[7]}
          handleSquareValue={() => handleSquareValue(7)}
        />
        <Square
          value={squares[8]}
          handleSquareValue={() => handleSquareValue(8)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  console.log(xIsNext);
  const handlePlay = (newSquares) => {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Start the Game.";
    }
    return (
      <li key={move} className="bg-gray-700 text-white mb-1 p-1 rounded-sm">
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <>
      <div>
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
