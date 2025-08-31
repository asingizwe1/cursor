export interface Bird {
  y: number
  velocity: number
  gravity: number
  jumpForce: number
}

export interface Pipe {
  x: number
  topHeight: number
  bottomHeight: number
  gap: number
  width: number
  scored: boolean
}

export interface GameState {
  bird: Bird
  pipes: Pipe[]
  score: number
  isGameOver: boolean
  gameStarted: boolean
}

export const GAME_CONFIG = {
  BIRD_SIZE: 30,
  PIPE_WIDTH: 60,
  PIPE_GAP: 150,
  PIPE_SPEED: 3,
  PIPE_SPAWN_INTERVAL: 1500,
  GRAVITY: 0.5,
  JUMP_FORCE: -10,
  GROUND_HEIGHT: 100,
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
} 