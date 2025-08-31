import { useState } from 'react'
import { SnakeGame } from './games/snake/SnakeGame'
import { FlappyBirdGame } from './games/flappy-bird/FlappyBirdGame'
import './App.css'

type Game = 'snake' | 'flappy-bird' | null

function App() {
  const [selectedGame, setSelectedGame] = useState<Game>(null)

  const renderGame = () => {
    switch (selectedGame) {
      case 'snake':
        return <SnakeGame />
      case 'flappy-bird':
        return <FlappyBirdGame />
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setSelectedGame('snake')}
              className="p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Snake Game</h2>
              <p className="text-gray-300">Classic snake game with modern graphics</p>
            </button>
            <button
              onClick={() => setSelectedGame('flappy-bird')}
              className="p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Flappy Bird</h2>
              <p className="text-gray-300">Navigate through pipes in this challenging game</p>
            </button>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            {selectedGame ? selectedGame === 'snake' ? 'Snake Game' : 'Flappy Bird' : 'Game Selection'}
          </h1>
          {selectedGame && (
            <button
              onClick={() => setSelectedGame(null)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Back to Menu
            </button>
          )}
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          {renderGame()}
        </div>
      </div>
    </div>
  )
}

export default App
