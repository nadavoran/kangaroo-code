import type { LevelConfig } from "../types/game.types";
import { generateRandomTreats } from "../utils/generateTreats";

export const level3 = (): LevelConfig => {
  const gridSize = 5;
  const initialPlayer = { x: 0, y: 0 };
  const goal = { x: 4, y: 4 };
  const obstacles = [
    { position: { x: 1, y: 0 }, emoji: "🌴", type: "tree" },
    { position: { x: 2, y: 1 }, emoji: "🌴", type: "tree" },
    { position: { x: 2, y: 2 }, emoji: "🌴", type: "tree" },
    { position: { x: 4, y: 3 }, emoji: "🌴", type: "tree" },
    { position: { x: 1, y: 4 }, emoji: "🌴", type: "tree" },
  ];

  return {
    id: 3,
    name: "🏀 Level 3: Basketball Challenge",
    description: "Dodge the palm trees and slam dunk!",
    gridSize,
    initialPlayer,
    goal,
    playerEmoji: "🦘",
    goalEmoji: "🏀",
    obstacles,
    collectibles: generateRandomTreats(gridSize, initialPlayer, goal, obstacles),
    maxCommands: 15,
    successMessage: "Slam dunk! Perfect shot! 🏆",
    failMessage: "Watch out for those trees! Try again! 🦘",
    allowRandomize: true,
    enableTreats: true,
  };
};
