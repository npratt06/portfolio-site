import { MouseEventHandler } from 'react';

export interface HighScoresState {
  scores: HighScoreItem[];
  highScoresAvailable: boolean;
  scoresLoading: boolean;
}

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
