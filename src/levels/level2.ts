import type { LevelConfig } from "../types/game.types";

export const level2 = (): LevelConfig => ({
  id: 2,
  name: "🐨 Level 2: Sleepy Koalas",
  description: "Navigate around the sleepy koalas to reach the eucalyptus!",
  gridSize: 5,
  initialPlayer: { x: 0, y: 0 },
  goal: { x: 4, y: 4 },
  playerEmoji: "🦘",
  goalEmoji: "🌿",
  obstacles: [
    { position: { x: 2, y: 1 }, emoji: "🐨", type: "koala" },
    { position: { x: 2, y: 2 }, emoji: "🐨", type: "koala" },
    { position: { x: 2, y: 3 }, emoji: "🐨", type: "koala" },
  ],
  maxCommands: 12,
  successMessage: "Great job! You navigated around the koalas! 🎉",
  failMessage: "Oops! Don't wake the koalas! Try again! 🦘",
});
