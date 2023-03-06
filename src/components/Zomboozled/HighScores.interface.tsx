import { MouseEventHandler } from 'react';

export interface HighScoresState {
  scores: HighScoreItem[];
  newScore: HighScoreItem;
  scoreSubmitted: boolean;
  newHighScore: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HighScoresProps {
  playAgainHandler: MouseEventHandler<HTMLButtonElement>;
  newScore: number;
}

export interface HighScoreItem {
  name: string;
  score: number;
  date: string;
  id: string;
}
