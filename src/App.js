import { IonApp, IonPage } from "@ionic/react";
import React from "react";
import { useState } from "react";
import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton
} from "@ionic/react";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "./main.css";

setupIonicReact();

function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleCLick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="content">
      <h2>{status}</h2>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleCLick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleCLick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleCLick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleCLick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleCLick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleCLick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleCLick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleCLick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleCLick(8)} />
      </div>
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <IonButton onClick={() => jumpTo(move)}>{description}</IonButton>
      </li>
    );
  });

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Header</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true} className="ion-padding" color="secondary">
          <div className="game">
            <div className="game-board">
              <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
              />
            </div>
            <div className="game-info">
              <ol>{moves}</ol>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
}
