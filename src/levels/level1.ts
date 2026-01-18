import type { LevelConfig } from "../types/game.types";
import { generateRandomTreats } from "../utils/generateTreats";

export const level1 = (): LevelConfig => {
  const gridSize = 3;
  const initialPlayer = { x: 0, y: 0 };
  const goal = { x: 2, y: 2 };

  return {
    id: 1,
    name: "🦘 Level 1: Kangaroo Kick",
    description:
      "Help the kangaroo reach the soccer ball! Collect treats along the way!",
    gridSize,
    initialPlayer,
    goal,
    playerEmoji: "🦘",
    goalEmoji: "⚽",
    collectibles: generateRandomTreats(gridSize, initialPlayer, goal),
    maxCommands: 10,
    successMessage: "GOAL! You did it! 🎉",
    failMessage: "Try again! 🦘",
    allowRandomize: true,
    enableTreats: true,
  };
};
