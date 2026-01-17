import type { LevelConfig } from "../types/game.types";

export const level1 = (): LevelConfig => ({
  id: 1,
  name: "🦘 Level 1: Kangaroo Kick",
  description: "Help the kangaroo reach the soccer ball!",
  gridSize: 3,
  initialPlayer: { x: 0, y: 0 },
  goal: { x: 2, y: 2 },
  playerEmoji: "🦘",
  goalEmoji: "⚽",
  maxCommands: 10,
  successMessage: "GOAL! You did it! 🎉",
  failMessage: "Try again! 🦘",
});
