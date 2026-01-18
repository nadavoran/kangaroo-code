export type Position = { x: number; y: number };
export type Direction = "Up" | "Down" | "Left" | "Right";
export type Command =
  | Direction
  | { type: "Repeat"; count: number; command: Direction };

export interface CommandItem {
  id: string;
  command: Command;
}

export interface Obstacle {
  position: Position;
  emoji: string;
  type: string;
}

export interface Collectible {
  position: Position;
  emoji: string;
  type: "water" | "treat";
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
  collectibles?: Collectible[];
  maxCommands: number;
  successMessage: string;
  failMessage: string;
  isRandom?: boolean; // Indicates if this level generates random layouts
  allowRandomize?: boolean; // Allow "Next" button to regenerate level
  enableTreats?: boolean; // Enable automatic treat generation (default: true)
}
