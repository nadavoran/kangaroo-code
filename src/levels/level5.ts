import type { LevelConfig, Obstacle } from "../types/game.types";
import { hasPath } from "../utils/pathfinding";
import { generateRandomTreats } from "../utils/generateTreats";

export const level5 = (): LevelConfig => {
  // Simple random layout - 3-5 obstacles
  const gridSize = 5;
  const start = { x: 0, y: 0 };
  const goal = { x: gridSize - 1, y: gridSize - 1 };
  let obstacles: Obstacle[] = [];

  // Keep generating until we find a solvable configuration
  let attempts = 0;
  const maxAttempts = 100;

  do {
    obstacles = [];
    const numObstacles = Math.floor(Math.random() * 3) + 3; // 3-5 obstacles
    const emojis = ["🌵", "🪨", "🌳", "🌴", "🐨"];
    const occupiedPositions = new Set<string>();
    occupiedPositions.add(`${start.x},${start.y}`);
    occupiedPositions.add(`${goal.x},${goal.y}`);

    for (let i = 0; i < numObstacles; i++) {
      let x, y;
      let innerAttempts = 0;
      do {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * gridSize);
        innerAttempts++;
      } while (occupiedPositions.has(`${x},${y}`) && innerAttempts < 50);

      if (innerAttempts < 50) {
        occupiedPositions.add(`${x},${y}`);
        obstacles.push({
          position: { x, y },
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          type: "obstacle",
        });
      }
    }

    attempts++;
  } while (
    !hasPath(gridSize, start, goal, obstacles) &&
    attempts < maxAttempts
  );

  return {
    id: 5,
    name: "🎲 Level 5: Random Easy",
    description: "Navigate through a simple random obstacle course!",
    gridSize,
    initialPlayer: start,
    goal,
    playerEmoji: "🦘",
    goalEmoji: "🎯",
    obstacles,
    collectibles: generateRandomTreats(gridSize, start, goal, obstacles),
    maxCommands: 12,
    successMessage: "Nice work! You navigated the random course! 🎉",
    failMessage: "Oops! Try a different path! 🦘",
    isRandom: true,
    enableTreats: true,
  };
};
