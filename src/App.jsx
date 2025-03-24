import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import New from './components/New'
import Game from './components/Game'
import Modal from './components/Modal'

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [turn, setTurn] = useState(0);
  const [game, setGame] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [player1Mark, setPlayer1Mark] = useState('o');
  const [isCpuMode, setIsCpuMode] = useState(false);

  const startGame = (mark, cpuMode) => {
    setIsGameStarted(true);
    setPlayer1Mark(mark);
    setIsCpuMode(cpuMode);
    // Ustawiamy turę: jeśli gracz to X, zaczyna (turn = 0), jeśli O, zaczyna CPU (turn = 1)
    setTurn(mark === 'x' ? 0 : 1);
  };

  const resetGame = () => {
    setGame([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setTurn(player1Mark === 'x' ? 0 : 1); // Przy resetowaniu zachowujemy tę samą logikę co przy starcie
  };

  const quitGame = () => {
    setIsGameStarted(false);
    resetGame();
    setIsCpuMode(false);
  };

  return (
    <div className="min-h-screen bg-blue">
      {isGameStarted ? (
        <Game
          turn={turn}
          setTurn={setTurn}
          game={game}
          setGame={setGame}
          resetGame={resetGame}
          quitGame={quitGame}
          player1Mark={player1Mark}
          isCpuMode={isCpuMode}
        />
      ) : (
        <New startGame={startGame} />
      )}
    </div>
  );
}

export default App;