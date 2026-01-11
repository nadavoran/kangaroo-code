import type { Position, Obstacle } from "../types/game.types";

/**
 * Check if there's a valid path from start to goal using BFS
 * Returns true if the board is solvable
 */
export function hasPath(
  gridSize: number,
  start: Position,
  goal: Position,
  obstacles: Obstacle[]
): boolean {
  // Create a set of obstacle positions for quick lookup
  const obstacleSet = new Set<string>();
  obstacles.forEach((obs) => {
    obstacleSet.add(`${obs.position.x},${obs.position.y}`);
  });

  // BFS to find if there's a path
  const queue: Position[] = [start];
  const visited = new Set<string>();
  visited.add(`${start.x},${start.y}`);

  while (queue.length > 0) {
    const current = queue.shift()!;

    // Check if we reached the goal
    if (current.x === goal.x && current.y === goal.y) {
      return true;
    }

    // Try all four directions
    const directions = [
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 }, // Down
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 }, // Right
    ];

    for (const dir of directions) {
      const nextX = current.x + dir.x;
      const nextY = current.y + dir.y;
      const key = `${nextX},${nextY}`;

      // Check if the next position is valid
      if (
        nextX >= 0 &&
        nextX < gridSize &&
        nextY >= 0 &&
        nextY < gridSize &&
        !visited.has(key) &&
        !obstacleSet.has(key)
      ) {
        visited.add(key);
        queue.push({ x: nextX, y: nextY });
      }
    }
  }

  return false; // No path found
}
