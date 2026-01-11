import type { LevelConfig } from "../types/game.types";

export const level3 = (): LevelConfig => ({
  id: 3,
  name: "🏀 Level 3: Basketball Challenge",
  description: "Dodge the palm trees and slam dunk!",
  gridSize: 5,
  initialPlayer: { x: 0, y: 0 },
  goal: { x: 4, y: 4 },
  playerEmoji: "🦘",
  goalEmoji: "🏀",
  obstacles: [
    { position: { x: 1, y: 0 }, emoji: "🌴", type: "tree" },
    { position: { x: 2, y: 1 }, emoji: "🌴", type: "tree" },
    { position: { x: 2, y: 2 }, emoji: "🌴", type: "tree" },
    { position: { x: 4, y: 3 }, emoji: "🌴", type: "tree" },
    { position: { x: 1, y: 4 }, emoji: "🌴", type: "tree" },
  ],
  maxCommands: 15,
  successMessage: "Slam dunk! Perfect shot! 🏆",
  failMessage: "Watch out for those trees! Try again! 🦘",
});
