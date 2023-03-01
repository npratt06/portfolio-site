export interface HighScoresState {
    scores: HighScoreItem[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HighScoresProps {
    newScore: number
}

export interface HighScoreItem {
    name: string,
    score: number,
    date: string,
    id: string
}