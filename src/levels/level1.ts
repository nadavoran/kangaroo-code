import type { LevelConfig } from "../types/game.types";

export const level1 = (): LevelConfig => ({
  id: 1,
  name: "🦘 Level 1: Kangaroo Kick",
  description: "Help the kangaroo reach the soccer ball!",
  gridSize: 5,
  initialPlayer: { x: 0, y: 0 },
  goal: { x: 4, y: 4 },
  playerEmoji: "🦘",
  goalEmoji: "⚽",
  maxCommands: 10,
  successMessage: "GOAL! You did it! 🎉",
  failMessage: "Try again! 🦘",
});
