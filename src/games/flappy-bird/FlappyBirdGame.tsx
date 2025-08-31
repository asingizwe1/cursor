import { useEffect, useRef, useState } from 'react'
import { FlappyBirdLogic } from './flappyBirdLogic'
import { GAME_CONFIG } from '../../types/flappy-bird'
import { getHighScore, updateHighScore } from '../../utils/highScores'

export function FlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameLogic] = useState(() => new FlappyBirdLogic())
  const [gameState, setGameState] = useState(gameLogic.getState())
  const [highScore, setHighScore] = useState(getHighScore('flappy-bird'))
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (!gameState.gameStarted || gameState.isGameOver) {
          gameLogic.startGame()
        } else {
          gameLogic.jump()
        }
      }
    }

    const handleClick = () => {
      if (!gameState.gameStarted || gameState.isGameOver) {
        gameLogic.startGame()
      } else {
        gameLogic.jump()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    canvas.addEventListener('click', handleClick)

    const gameLoop = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime
      }

      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      gameLogic.update(deltaTime)
      const newState = gameLogic.getState()
      setGameState(newState)

      if (newState.isGameOver) {
        const newHighScore = updateHighScore('flappy-bird', newState.score)
        setHighScore(newHighScore)
      }

      // Clear canvas
      ctx.clearRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT)

      // Draw background
      ctx.fillStyle = '#87CEEB'
      ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT)

      // Draw ground
      ctx.fillStyle = '#8B4513'
      ctx.fillRect(0, GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.GROUND_HEIGHT)

      // Draw pipes
      ctx.fillStyle = '#2E8B57'
      gameState.pipes.forEach(pipe => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight)
        // Bottom pipe
        ctx.fillRect(
          pipe.x,
          GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT - pipe.bottomHeight,
          pipe.width,
          pipe.bottomHeight
        )
      })

      // Draw bird
      const birdX = GAME_CONFIG.CANVAS_WIDTH / 2
      const birdY = gameState.bird.y
      const birdSize = GAME_CONFIG.BIRD_SIZE

      // Bird body
      ctx.fillStyle = '#FFD700'
      ctx.beginPath()
      ctx.ellipse(birdX, birdY, birdSize/2, birdSize/3, 0, 0, Math.PI * 2)
      ctx.fill()

      // Wings
      ctx.fillStyle = '#FFC000'
      ctx.beginPath()
      ctx.ellipse(
        birdX - birdSize/3,
        birdY,
        birdSize/3,
        birdSize/4,
        Math.PI/4 + (gameState.bird.velocity * 0.1),
        0,
        Math.PI * 2
      )
      ctx.fill()

      // Beak
      ctx.fillStyle = '#FF6B6B'
      ctx.beginPath()
      ctx.moveTo(birdX + birdSize/2, birdY)
      ctx.lineTo(birdX + birdSize/2 + 10, birdY - 5)
      ctx.lineTo(birdX + birdSize/2 + 10, birdY + 5)
      ctx.closePath()
      ctx.fill()

      // Eye
      ctx.fillStyle = 'black'
      ctx.beginPath()
      ctx.arc(birdX + birdSize/4, birdY - birdSize/6, birdSize/8, 0, Math.PI * 2)
      ctx.fill()

      // Draw score and high score
      ctx.fillStyle = 'white'
      ctx.font = '24px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(`Score: ${gameState.score}`, 20, 40)
      ctx.fillText(`High Score: ${highScore?.score || 0}`, 20, 70)

      // Draw game over or start message
      if (gameState.isGameOver || !gameState.gameStarted) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT)
        
        ctx.fillStyle = 'white'
        ctx.font = '48px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(
          gameState.isGameOver ? 'Game Over!' : 'Click or Press Space to Start',
          GAME_CONFIG.CANVAS_WIDTH / 2,
          GAME_CONFIG.CANVAS_HEIGHT / 2
        )

        if (gameState.isGameOver) {
          ctx.font = '24px Arial'
          ctx.fillText(
            'Click or Press Space to Try Again',
            GAME_CONFIG.CANVAS_WIDTH / 2,
            GAME_CONFIG.CANVAS_HEIGHT / 2 + 50
          )
        }
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      canvas.removeEventListener('click', handleClick)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameLogic, gameState])

  return (
    <canvas
      ref={canvasRef}
      width={GAME_CONFIG.CANVAS_WIDTH}
      height={GAME_CONFIG.CANVAS_HEIGHT}
      className="border border-gray-700 rounded-lg"
    />
  )
} 