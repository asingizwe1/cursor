import React, { useEffect, useRef, useState } from 'react';
import { SnakeGame as SnakeGameLogic } from './gameLogic';
import { Direction, GameConfig } from '../../types/snake';
import { getHighScore, updateHighScore } from '../../utils/highScores';

const defaultConfig: GameConfig = {
  gridSize: 20,
  cellSize: 25,
  initialSpeed: 150,
};

export const SnakeGame: React.FC<{ config?: GameConfig }> = ({ config = defaultConfig }) => {
  const gameRef = useRef<SnakeGameLogic | null>(null);
  const [gameState, setGameState] = useState(gameRef.current?.getState());
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(getHighScore('snake'));

  useEffect(() => {
    gameRef.current = new SnakeGameLogic(config);
    setGameState(gameRef.current.getState());

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRef.current) return;

      const keyDirections: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };

      if (keyDirections[e.key]) {
        e.preventDefault();
        gameRef.current.changeDirection(keyDirections[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [config]);

  useEffect(() => {
    if (!gameRef.current || isPaused) return;

    const gameLoop = setInterval(() => {
      gameRef.current?.move();
      const newState = gameRef.current?.getState();
      setGameState(newState);

      if (newState?.isGameOver) {
        const newHighScore = updateHighScore('snake', newState.score);
        setHighScore(newHighScore);
      }
    }, config.initialSpeed);

    return () => clearInterval(gameLoop);
  }, [config.initialSpeed, isPaused]);

  const handleReset = () => {
    gameRef.current?.reset();
    setGameState(gameRef.current?.getState());
    setIsPaused(false);
  };

  if (!gameState) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full">
        <div className="text-xl font-bold text-white">Score: {gameState.score}</div>
        <div className="text-xl font-bold text-white">High Score: {highScore?.score || 0}</div>
      </div>
      <div 
        className="relative bg-gray-800 border-4 border-gray-600"
        style={{
          width: `${config.gridSize * config.cellSize}px`,
          height: `${config.gridSize * config.cellSize}px`,
          minWidth: `${config.gridSize * config.cellSize}px`,
          minHeight: `${config.gridSize * config.cellSize}px`,
        }}
      >
        {/* Grid lines */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${config.cellSize}px ${config.cellSize}px`,
          }}
        />
        
        {/* Snake */}
        {gameState.snake.map((segment, index) => (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className="absolute bg-green-500"
            style={{
              width: `${config.cellSize - 2}px`,
              height: `${config.cellSize - 2}px`,
              left: `${segment.x * config.cellSize + 1}px`,
              top: `${segment.y * config.cellSize + 1}px`,
              borderRadius: index === 0 ? '4px' : '2px',
              zIndex: 20,
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-red-500"
          style={{
            width: `${config.cellSize - 2}px`,
            height: `${config.cellSize - 2}px`,
            left: `${gameState.food.x * config.cellSize + 1}px`,
            top: `${gameState.food.y * config.cellSize + 1}px`,
            borderRadius: '50%',
            zIndex: 10,
          }}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Reset
        </button>
      </div>

      {gameState.isGameOver && (
        <div className="text-2xl font-bold text-red-500">Game Over!</div>
      )}
    </div>
  );
}; 