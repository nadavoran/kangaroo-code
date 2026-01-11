export type Position = { x: number; y: number };
export type Command = "Up" | "Down" | "Left" | "Right";

export interface Obstacle {
  position: Position;
  emoji: string;
  type: string;
}

export interface LevelConfig {
  id: number;
  name: string;
  description: string;
  gridSize: number;
  initialPlayer: Position;
  goal: Position;
  playerEmoji: string;
  goalEmoji: string;
  obstacles?: Obstacle[];
  maxCommands: number;
  successMessage: string;
  failMessage: string;
  isRandom?: boolean; // Indicates if this level generates random layouts
}
