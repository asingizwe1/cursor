export type GameType = 'snake' | 'flappy-bird';

export interface HighScore {
  score: number;
  date: string;
}

export const getHighScore = (gameType: GameType): HighScore | null => {
  const stored = localStorage.getItem(`highScore_${gameType}`);
  return stored ? JSON.parse(stored) : null;
};

export const updateHighScore = (gameType: GameType, score: number): HighScore => {
  const currentHighScore = getHighScore(gameType);
  const newHighScore: HighScore = {
    score,
    date: new Date().toISOString(),
  };

  if (!currentHighScore || score > currentHighScore.score) {
    localStorage.setItem(`highScore_${gameType}`, JSON.stringify(newHighScore));
    return newHighScore;
  }

  return currentHighScore;
}; 