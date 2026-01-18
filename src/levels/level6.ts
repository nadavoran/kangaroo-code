import type { LevelConfig, Obstacle } from "../types/game.types";
import { hasPath } from "../utils/pathfinding";
import { generateRandomTreats } from "../utils/generateTreats";

export const level6 = (): LevelConfig => {
  // Mid complexity random layout - random grid size 5-7, with patterns
  const gridSize = Math.floor(Math.random() * 3) + 5; // 5-7 grid size
  const start = { x: 0, y: 0 };
  const goal = { x: gridSize - 1, y: gridSize - 1 };
  let obstacles: Obstacle[] = [];

  // Keep generating until we find a solvable configuration
  let attempts = 0;
  const maxAttempts = 100;

  do {
    obstacles = [];
    const emojis = ["🌵", "🪨", "🌳", "🌴", "🐨", "🌿", "🍃"];
    const occupiedPositions = new Set<string>();
    occupiedPositions.add(`${start.x},${start.y}`);
    occupiedPositions.add(`${goal.x},${goal.y}`);

    // Number of obstacles scales with grid size
    const baseObstacles = Math.floor(gridSize * 1.2);
    const numObstacles = Math.floor(Math.random() * 4) + baseObstacles; // baseObstacles to baseObstacles+3

    // Sometimes create a line of obstacles to make it more interesting
    const createPattern = Math.random() > 0.5;

    if (createPattern) {
      // Create a line of 2-3 obstacles
      const lineLength = Math.min(
        Math.floor(Math.random() * 2) + 2,
        gridSize - 1
      );
      const isHorizontal = Math.random() > 0.5;
      const startX = Math.floor(
        Math.random() * (gridSize - (isHorizontal ? lineLength : 0))
      );
      const startY = Math.floor(
        Math.random() * (gridSize - (isHorizontal ? 0 : lineLength))
      );
      const obstacleEmoji = emojis[Math.floor(Math.random() * emojis.length)];

      for (let i = 0; i < lineLength; i++) {
        const x = startX + (isHorizontal ? i : 0);
        const y = startY + (isHorizontal ? 0 : i);

        if (!occupiedPositions.has(`${x},${y}`)) {
          occupiedPositions.add(`${x},${y}`);
          obstacles.push({
            position: { x, y },
            emoji: obstacleEmoji,
            type: "obstacle",
          });
        }
      }
    }

    // Fill remaining obstacles randomly
    while (obstacles.length < numObstacles) {
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
      } else {
        break;
      }
    }

    attempts++;
  } while (
    !hasPath(gridSize, start, goal, obstacles) &&
    attempts < maxAttempts
  );

  // Calculate max commands based on grid size
  const maxCommands = Math.ceil(gridSize * 3);

  return {
    id: 6,
    name: "🎯 Level 6: Random Medium",
    description: "A moderately challenging random maze awaits!",
    gridSize,
    initialPlayer: start,
    goal,
    playerEmoji: "🦘",
    goalEmoji: "🏆",
    obstacles,
    collectibles: generateRandomTreats(gridSize, start, goal, obstacles),
    maxCommands,
    successMessage: "Excellent! You conquered the medium maze! 🎉",
    failMessage: "Tricky maze! Give it another go! 🦘",
    isRandom: true,
    enableTreats: true,
  };
};
