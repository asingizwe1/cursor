import { Direction, GameState, Position, GameConfig } from '../../types/snake';

export class SnakeGame {
  private state: GameState;
  private config: GameConfig;

  constructor(config: GameConfig) {
    this.config = config;
    this.state = this.getInitialState();
  }

  private getInitialState(): GameState {
    const center = Math.floor(this.config.gridSize / 2);
    return {
      snake: [{ x: center, y: center }],
      food: this.generateFood([{ x: center, y: center }]),
      direction: 'RIGHT',
      isGameOver: false,
      score: 0,
    };
  }

  private generateFood(snake: Position[]): Position {
    let food: Position;
    do {
      food = {
        x: Math.floor(Math.random() * this.config.gridSize),
        y: Math.floor(Math.random() * this.config.gridSize),
      };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
    return food;
  }

  public move(): void {
    if (this.state.isGameOver) return;

    const head = { ...this.state.snake[0] };
    
    switch (this.state.direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    // Check for collisions
    if (
      head.x < 0 ||
      head.x >= this.config.gridSize ||
      head.y < 0 ||
      head.y >= this.config.gridSize ||
      this.state.snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      this.state.isGameOver = true;
      return;
    }

    this.state.snake.unshift(head);

    // Check if food is eaten
    if (head.x === this.state.food.x && head.y === this.state.food.y) {
      this.state.score += 10;
      this.state.food = this.generateFood(this.state.snake);
    } else {
      this.state.snake.pop();
    }
  }

  public changeDirection(newDirection: Direction): void {
    const opposites = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (opposites[newDirection] !== this.state.direction) {
      this.state.direction = newDirection;
    }
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public reset(): void {
    this.state = this.getInitialState();
  }
} 