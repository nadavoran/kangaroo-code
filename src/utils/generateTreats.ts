import type { Collectible, Position, Obstacle } from "../types/game.types";

/**
 * Generates random treats for a level
 * @param gridSize - Size of the grid
 * @param playerPos - Player's starting position
 * @param goalPos - Goal position
 * @param obstacles - Array of obstacles to avoid
 * @returns Array of collectible treats
 */
export function generateRandomTreats(
  gridSize: number,
  playerPos: Position,
  goalPos: Position,
  obstacles?: Obstacle[]
): Collectible[] {
  // Maximum treats is half of gridSize
  const maxTreats = Math.floor(gridSize / 2);
  
  // Random number of treats (1 to maxTreats)
  const numTreats = Math.floor(Math.random() * maxTreats) + 1;
  
  // Available treat emojis
  const treatEmojis = ["🍪", "🥕", "🍎", "🍌", "🍓", "🍇", "🍊", "🍑"];
  
  const treats: Collectible[] = [];
  const occupiedPositions = new Set<string>();
  
  // Mark player and goal positions as occupied
  occupiedPositions.add(`${playerPos.x},${playerPos.y}`);
  occupiedPositions.add(`${goalPos.x},${goalPos.y}`);
  
  // Mark obstacle positions as occupied
  if (obstacles) {
    obstacles.forEach((obs) => {
      occupiedPositions.add(`${obs.position.x},${obs.position.y}`);
    });
  }
  
  // Generate random treats
  let attempts = 0;
  const maxAttempts = gridSize * gridSize * 2; // Prevent infinite loop
  
  while (treats.length < numTreats && attempts < maxAttempts) {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    const posKey = `${x},${y}`;
    
    if (!occupiedPositions.has(posKey)) {
      const randomEmoji = treatEmojis[Math.floor(Math.random() * treatEmojis.length)];
      treats.push({
        position: { x, y },
        emoji: randomEmoji,
        type: "treat",
      });
      occupiedPositions.add(posKey);
    }
    
    attempts++;
  }
  
  return treats;
}
