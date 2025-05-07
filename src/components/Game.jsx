import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/images/logo.svg';
import reset from '../assets/images/icon-restart.svg';
import x from '../assets/images/icon-x.svg';
import o from '../assets/images/icon-o.svg';
import Modal from './Modal';

const Game = ({ turn, setTurn, game, setGame, resetGame, quitGame, player1Mark, isCpuMode = false }) => {
  const [showRestartModal, setShowRestartModal] = useState(false);
  const cpuMoveScheduled = useRef(false);
  const [winningCells, setWinningCells] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCpuMoving, setIsCpuMoving] = useState(false);
  const [scores, setScores] = useState({
    player1: 0,
    player2: 0,
    ties: 0,
  });

  const cpuMark = player1Mark === 'x' ? 'o' : 'x';

  const addSymbol = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (!game[row][col] && !winner && !isCpuMoving) {
      const currentPlayer = turn % 2 === 0 ? player1Mark : cpuMark;
      setGame((prev) => {
        const newGame = prev.map((r) => [...r]);
        newGame[row][col] = currentPlayer;
        return newGame;
      });
      setTurn((prev) => prev + 1);
    }
  };

  // Poprawiona funkcja checkWinner - działa tylko na podstawie przekazanego board
  const checkWinner = (board) => {
    // Sprawdzenie wierszy
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return { winner: board[i][0], cells: [i * 3, i * 3 + 1, i * 3 + 2] };
      }
    }
    // Sprawdzenie kolumn
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return { winner: board[0][i], cells: [i, i + 3, i + 6] };
      }
    }
    // Sprawdzenie przekątnych
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return { winner: board[0][0], cells: [0, 4, 8] };
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return { winner: board[0][2], cells: [2, 4, 6] };
    }
    // Sprawdzenie remisu
    const isFull = board.every((row) => row.every((cell) => cell !== ''));
    if (isFull) {
      return { winner: 'tie', cells: [] };
    }
    return null;
  };

  // Funkcja minimax - już poprawna w Twoim kodzie
  const minimax = (board, depth, isMaximizing) => {
    const result = checkWinner(board);
    if (result) {
      if (result.winner === cpuMark) return 10 - depth; // CPU wygrywa
      if (result.winner === player1Mark) return depth - 10; // Gracz wygrywa
      return 0; // Remis
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!board[i][j]) {
            board[i][j] = cpuMark;
            const score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!board[i][j]) {
            board[i][j] = player1Mark;
            const score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  };

  // Zmodyfikowana funkcja cpuMove z użyciem minimax
  const cpuMove = () => {
    if (isCpuMoving) return;
    setIsCpuMoving(true);

    let bestScore = -Infinity;
    let bestMove = null;

    // Przeszukaj wszystkie możliwe ruchy
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!game[i][j]) {
          // Utwórz kopię planszy
          const boardCopy = game.map(row => [...row]);
          boardCopy[i][j] = cpuMark;
          // Wywołaj minimax dla ruchu CPU, potem tura gracza (isMaximizing=false)
          const score = minimax(boardCopy, 0, false);
          if (score > bestScore) {
            bestScore = score;
            bestMove = { row: i, col: j };
          }
        }
      }
    }

    if (bestMove) {
      const index = bestMove.row * 3 + bestMove.col;
      setTimeout(() => {
        addSymbol(index);
        setIsCpuMoving(false);
        cpuMoveScheduled.current = false;
      }, 500); // Zachowaj opóźnienie 500ms dla realizmu
    } else {
      setIsCpuMoving(false);
      cpuMoveScheduled.current = false;
    }
  };

  useEffect(() => {
    const result = checkWinner(game);
    if (result && !winner) {
      setWinner(result.winner);
      setWinningCells(result.cells);
      if (result.winner === 'tie') {
        setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
      } else if (result.winner === player1Mark) {
        setScores((prev) => ({ ...prev, player1: prev.player1 + 1 }));
      } else {
        setScores((prev) => ({ ...prev, player2: prev.player2 + 1 }));
      }
      if (result.winner) {
        setTimeout(() => setShowModal(true), 1000);
      }
    } else if (isCpuMode && !winner && turn % 2 === 1 && !isCpuMoving && !cpuMoveScheduled.current) {
      cpuMoveScheduled.current = true;
      cpuMove();
    }
  }, [turn, isCpuMode, winner, isCpuMoving]);

  const baseClasses = 'cursor-pointer min-w-[96px] min-h-[96px] max-w-[96px] max-h-[96px] lg:min-w-[140px] lg:min-h-[140px] shadow-custom rounded-[10px]';

  return (
    <div className='flex flex-col items-center justify-center pt-[80px] lg:pt-[100px]'>
      <div className='flex gap-[34px] lg:gap-[100px] items-center pb-[25px]'>
        <div>
          <img src={logo} alt="" />
        </div>
        <div>
          <button className="cursor-pointer py-[13px] px-[30px] rounded-[10px] shadow-custom flex gap-[13px] font-bold text-gray text-[16px] bg-desaturatedblue">
            <img
              src={turn % 2 === 0 ? (player1Mark === 'x' ? x : o) : player1Mark === 'x' ? o : x}
              alt="Turn"
              className="w-5 h-5"
            />
            TURN
          </button>
        </div>
        <div>
          <button onClick={() => setShowRestartModal(true)} className='cursor-pointer bg-gray p-[15px] rounded-[10px] shadow-customwhite'>
            <img src={reset} alt="" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[20px]">
        {Array(9)
          .fill(null)
          .map((_, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const cellValue = game[row][col];
            const isWinningCell = winningCells.includes(index);
            const winningBg = isWinningCell
              ? winner === 'x'
                ? 'bg-cyan'
                : winner === 'o'
                ? 'bg-yellow'
                : 'bg-desaturatedblue'
              : 'bg-desaturatedblue';
  
            return (
              <div
                key={index}
                onClick={() => addSymbol(index)}
                className={`${baseClasses} ${winningBg} ${
                  cellValue === 'x'
                    ? 'bg-[url(src/assets/images/icon-x.svg)]'
                    : cellValue === 'o'
                    ? 'bg-[url(src/assets/images/icon-o.svg)]'
                    : turn % 2 === 0
                    ? `hover:bg-[url(src/assets/images/icon-${player1Mark}.svg)]`
                    : `hover:bg-[url(src/assets/images/icon-${player1Mark === 'x' ? 'o' : 'x'}.svg)]`
                } ${isWinningCell ? '' : ''} bg-center bg-no-repeat`}
              />
            );
          })}
        <div className={`${player1Mark === 'x' ? 'bg-cyan' : 'bg-yellow'} rounded-[10px] px-[20px] lg:px-[41px] py-[7px]`}>
          <p className=''>{player1Mark.toUpperCase()} (P1)</p>
          <p className='text-[22px] font-bold'>{scores.player1}</p>
        </div>
        <div className='bg-gray rounded-[10px] px-[20px] lg:px-[41px] py-[7px]'>
          <p className=''>TIES</p>
          <p className='text-[22px] font-bold'>{scores.ties}</p>
        </div>
        <div className={`${player1Mark === 'x' ? 'bg-yellow' : 'bg-cyan'} rounded-[10px] px-[20px] lg:px-[41px] py-[7px]`}>
          <p className=''>
            {player1Mark === 'x' ? (isCpuMode ? 'O (CPU)' : 'O (P2)') : (isCpuMode ? 'X (CPU)' : 'X (P2)')}
          </p>
          <p className='text-[22px] font-bold'>{scores.player2}</p>
        </div>
      </div>
      {showRestartModal && (
        <>
          <div className="overlay" />
          <Modal
            isRestart={true}
            onCancel={() => setShowRestartModal(false)}
            onRestart={() => {
              resetGame();
              setShowRestartModal(false);
            }}
          />
        </>
      )}
      {showModal && (
        <>
          <div className="overlay" />
          <Modal
            winner={winner}
            player1Mark={player1Mark}
            isCpuMode={isCpuMode}
            onQuit={quitGame}
            onNextRound={() => {
              resetGame();
              setWinner(null);
              setWinningCells([]);
              setShowModal(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Game;