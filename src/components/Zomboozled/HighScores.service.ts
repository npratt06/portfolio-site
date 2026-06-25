import { HighScoreItem } from './HighScores.interface';

export interface HighScoresListResult {
  available: boolean;
  scores: HighScoreItem[];
}

export interface HighScoresSubmitResult {
  accepted: boolean;
}

export interface HighScoresService {
  listScores: () => Promise<HighScoresListResult>;
  submitScore: (score: HighScoreItem) => Promise<HighScoresSubmitResult>;
}

export const offlineHighScoresService: HighScoresService = {
  async listScores() {
    return {
      available: false,
      scores: []
    };
  },
  async submitScore() {
    return {
      accepted: false
    };
  }
};
