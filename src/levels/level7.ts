import type { LevelConfig, Obstacle } from "../types/game.types";
import { hasPath } from "../utils/pathfinding";

export const level7 = (): LevelConfig => {
  // Complex random layout - random grid size 6-8, with complex patterns
  const gridSize = Math.floor(Math.random() * 3) + 6; // 6-8 grid size
  const start = { x: 0, y: 0 };
  const goal = { x: gridSize - 1, y: gridSize - 1 };
  let obstacles: Obstacle[] = [];

  // Keep generating until we find a solvable configuration
  let attempts = 0;
  const maxAttempts = 100;

  do {
    obstacles = [];
    const emojis = ["🌵", "🪨", "🌳", "🌴", "🐨", "🌿", "🍃", "🦎", "🕷️"];
    const occupiedPositions = new Set<string>();
    occupiedPositions.add(`${start.x},${start.y}`);
    occupiedPositions.add(`${goal.x},${goal.y}`);

    // Number of obstacles scales with grid size
    const baseObstacles = Math.floor(gridSize * 1.8);
    const numObstacles = Math.floor(Math.random() * 6) + baseObstacles; // baseObstacles to baseObstacles+5

    // Create multiple patterns for increased complexity
    const numPatterns = Math.floor(Math.random() * 2) + 1; // 1-2 patterns

    for (let p = 0; p < numPatterns; p++) {
      const patternType = Math.random();

      if (patternType < 0.33) {
        // Create a diagonal line
        const lineLength = Math.min(
          Math.floor(Math.random() * 2) + 2,
          gridSize - 1
        );
        const maxStart = gridSize - lineLength;
        if (maxStart > 0) {
          const startX = Math.floor(Math.random() * maxStart);
          const startY = Math.floor(Math.random() * maxStart);
          const obstacleEmoji =
            emojis[Math.floor(Math.random() * emojis.length)];

          for (let i = 0; i < lineLength; i++) {
            const x = startX + i;
            const y = startY + i;

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
      } else if (patternType < 0.66) {
        // Create an L-shape
        const cornerX = Math.floor(Math.random() * (gridSize - 1));
        const cornerY = Math.floor(Math.random() * (gridSize - 1));
        const obstacleEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Horizontal part
        for (let i = 0; i < 2; i++) {
          const x = cornerX + i;
          const y = cornerY;
          if (x < gridSize && !occupiedPositions.has(`${x},${y}`)) {
            occupiedPositions.add(`${x},${y}`);
            obstacles.push({
              position: { x, y },
              emoji: obstacleEmoji,
              type: "obstacle",
            });
          }
        }

        // Vertical part
        for (let i = 1; i < 2; i++) {
          const x = cornerX;
          const y = cornerY + i;
          if (y < gridSize && !occupiedPositions.has(`${x},${y}`)) {
            occupiedPositions.add(`${x},${y}`);
            obstacles.push({
              position: { x, y },
              emoji: obstacleEmoji,
              type: "obstacle",
            });
          }
        }
      } else {
        // Create a cross or plus pattern
        if (gridSize > 2) {
          const centerX = Math.floor(Math.random() * (gridSize - 2)) + 1;
          const centerY = Math.floor(Math.random() * (gridSize - 2)) + 1;
          const obstacleEmoji =
            emojis[Math.floor(Math.random() * emojis.length)];

          const crossPositions = [
            { x: centerX, y: centerY },
            { x: centerX - 1, y: centerY },
            { x: centerX + 1, y: centerY },
            { x: centerX, y: centerY - 1 },
            { x: centerX, y: centerY + 1 },
          ];

          for (const pos of crossPositions) {
            if (
              pos.x >= 0 &&
              pos.x < gridSize &&
              pos.y >= 0 &&
              pos.y < gridSize &&
              !occupiedPositions.has(`${pos.x},${pos.y}`)
            ) {
              occupiedPositions.add(`${pos.x},${pos.y}`);
              obstacles.push({
                position: pos,
                emoji: obstacleEmoji,
                type: "obstacle",
              });
            }
          }
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
      } while (occupiedPositions.has(`${x},${y}`) && innerAttempts < 100);

      if (innerAttempts < 100) {
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
  const maxCommands = Math.ceil(gridSize * 3.5);

  return {
    id: 7,
    name: "🔥 Level 7: Random Hard",
    description: "The ultimate random challenge - navigate complex patterns!",
    gridSize,
    initialPlayer: start,
    goal,
    playerEmoji: "🦘",
    goalEmoji: "💎",
    obstacles,
    maxCommands,
    successMessage: "AMAZING! You're a coding master! 🏅🎉",
    failMessage: "This one's tough! Keep trying! 🦘💪",
    isRandom: true,
  };
};
