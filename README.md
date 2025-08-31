# Cursor Demo App - Classic Games Collection

This repository was created as a demonstration of AI-assisted development using Cursor IDE. It showcases how AI can help build a modern web application with React, TypeScript, and Tailwind CSS.

## 🎮 Games Included

### 1. Snake Game
- Classic snake gameplay with modern graphics
- Responsive controls using arrow keys
- Score tracking and high score persistence
- Pause/Resume functionality
- Grid-based rendering with smooth animations

### 2. Flappy Bird
- Classic Flappy Bird gameplay
- Animated bird character with wings and beak
- Pipe obstacles with random generation
- Score tracking and high score persistence
- Click or Spacebar controls

## 🛠️ Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- LocalStorage for score persistence

## 🏗️ Project Structure

```
src/
├── games/
│   ├── snake/
│   │   ├── SnakeGame.tsx
│   │   └── gameLogic.ts
│   └── flappy-bird/
│       ├── FlappyBirdGame.tsx
│       └── flappyBirdLogic.ts
├── types/
│   ├── snake.ts
│   └── flappy-bird.ts
└── utils/
    └── highScores.ts
```

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/cursor-demo-app.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Features

- Clean separation of game logic and UI components
- Type-safe development with TypeScript
- Persistent high scores using localStorage
- Responsive design with Tailwind CSS
- Modern game selection interface
- Smooth animations and transitions

## 🤖 AI-Assisted Development

This project was developed using Cursor IDE's AI capabilities, demonstrating how AI can assist in:
- Creating React components
- Implementing game logic
- Managing state and effects
- Styling with Tailwind CSS
- Code organization and structure
- Type definitions and interfaces

## 📝 License

MIT License - feel free to use this code for your own projects!

## 🙏 Acknowledgments

- Cursor IDE for providing AI-assisted development capabilities
- React and TypeScript communities for their excellent documentation
- The original creators of Snake and Flappy Bird games for the inspiration
