import { Bird, Pipe, GameState, GAME_CONFIG } from '../../types/flappy-bird'

export class FlappyBirdLogic {
  private state: GameState
  private lastPipeSpawn: number = 0

  constructor() {
    this.state = this.getInitialState()
  }

  private getInitialState(): GameState {
    return {
      bird: {
        y: GAME_CONFIG.CANVAS_HEIGHT / 2,
        velocity: 0,
        gravity: GAME_CONFIG.GRAVITY,
        jumpForce: GAME_CONFIG.JUMP_FORCE,
      },
      pipes: [],
      score: 0,
      isGameOver: false,
      gameStarted: false,
    }
  }

  public startGame(): void {
    this.state = this.getInitialState()
    this.state.gameStarted = true
  }

  public jump(): void {
    if (!this.state.isGameOver) {
      this.state.bird.velocity = this.state.bird.jumpForce
    }
  }

  private spawnPipe(): void {
    const minHeight = 50
    const maxHeight = GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT - GAME_CONFIG.PIPE_GAP - minHeight
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight

    this.state.pipes.push({
      x: GAME_CONFIG.CANVAS_WIDTH,
      topHeight,
      bottomHeight: GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT - topHeight - GAME_CONFIG.PIPE_GAP,
      gap: GAME_CONFIG.PIPE_GAP,
      width: GAME_CONFIG.PIPE_WIDTH,
      scored: false
    })
  }

  private checkCollision(bird: Bird, pipe: Pipe): boolean {
    const birdRight = GAME_CONFIG.CANVAS_WIDTH / 2 + GAME_CONFIG.BIRD_SIZE / 2
    const birdLeft = GAME_CONFIG.CANVAS_WIDTH / 2 - GAME_CONFIG.BIRD_SIZE / 2
    const birdTop = bird.y - GAME_CONFIG.BIRD_SIZE / 2
    const birdBottom = bird.y + GAME_CONFIG.BIRD_SIZE / 2

    return (
      birdRight > pipe.x &&
      birdLeft < pipe.x + pipe.width &&
      (birdTop < pipe.topHeight || birdBottom > GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT - pipe.bottomHeight)
    )
  }

  public update(deltaTime: number): void {
    if (!this.state.gameStarted || this.state.isGameOver) return

    // Update bird
    this.state.bird.velocity += this.state.bird.gravity
    this.state.bird.y += this.state.bird.velocity

    // Spawn pipes
    const now = Date.now()
    if (now - this.lastPipeSpawn > GAME_CONFIG.PIPE_SPAWN_INTERVAL) {
      this.spawnPipe()
      this.lastPipeSpawn = now
    }

    // Update pipes and check score
    const birdX = GAME_CONFIG.CANVAS_WIDTH / 2
    this.state.pipes = this.state.pipes
      .map(pipe => {
        const newPipe = {
          ...pipe,
          x: pipe.x - GAME_CONFIG.PIPE_SPEED,
        }
        
        // Check if bird has passed this pipe
        if (!pipe.scored && newPipe.x + newPipe.width < birdX) {
          newPipe.scored = true
          this.state.score++
        }
        
        return newPipe
      })
      .filter(pipe => pipe.x + pipe.width > 0)

    // Check collisions
    const bird = this.state.bird
    if (
      bird.y < 0 ||
      bird.y > GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT ||
      this.state.pipes.some(pipe => this.checkCollision(bird, pipe))
    ) {
      this.state.isGameOver = true
    }
  }

  public getState(): GameState {
    return { ...this.state }
  }
} 