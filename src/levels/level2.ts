import type { LevelConfig } from "../types/game.types";
import { generateRandomTreats } from "../utils/generateTreats";

export const level2 = (): LevelConfig => {
  const gridSize = 4;
  const initialPlayer = { x: 0, y: 0 };
  const goal = { x: 3, y: 3 };
  const obstacles = [
    { position: { x: 2, y: 1 }, emoji: "🐨", type: "koala" },
    { position: { x: 2, y: 2 }, emoji: "🐨", type: "koala" },
  ];

  return {
    id: 2,
    name: "🐨 Level 2: Sleepy Koalas",
    description: "Navigate around the sleepy koalas to reach the eucalyptus!",
    gridSize,
    initialPlayer,
    goal,
    playerEmoji: "🦘",
    goalEmoji: "🌿",
    obstacles,
    collectibles: generateRandomTreats(gridSize, initialPlayer, goal, obstacles),
    maxCommands: 12,
    successMessage: "Great job! You navigated around the koalas! 🎉",
    failMessage: "Oops! Don't wake the koalas! Try again! 🦘",
    allowRandomize: true,
    enableTreats: true,
  };
};
