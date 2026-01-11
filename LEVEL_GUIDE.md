# Level Creation Guide

## How to Create New Levels

Adding new levels to Kangaroo Code is easy! Follow these steps:

### 1. Create a New Level File

Create a new file in `src/levels/` (e.g., `level4.ts`):

```typescript
import type { LevelConfig } from "../types/game.types";

export const level4 = (): LevelConfig => ({
  id: 4,
  name: "🏈 Level 4: Football Field",
  description: "Navigate the football field to reach the touchdown!",
  gridSize: 6,
  initialPlayer: { x: 0, y: 0 },
  goal: { x: 5, y: 5 },
  playerEmoji: "🦘",
  goalEmoji: "🏈",
  obstacles: [
    { position: { x: 2, y: 2 }, emoji: "⚠️", type: "cone" },
    { position: { x: 3, y: 3 }, emoji: "⚠️", type: "cone" },
  ],
  maxCommands: 15,
  successMessage: "Touchdown! Amazing! 🏆",
  failMessage: "Almost there! Try again! 🦘",
});
```

**Note:** Levels are exported as functions that return level configs. This ensures you always get fresh data and supports Hot Module Replacement (HMR) during development.

### 2. Add Your Level to the Index

Edit `src/levels/index.ts` to include your new level:

```typescript
import type { LevelConfig } from "../types/game.types";
import { level1 } from "./level1";
import { level2 } from "./level2";
import { level3 } from "./level3";
import { level4 } from "./level4"; // Add this

export const getAllLevels = (): LevelConfig[] => [
  level1(),   // Call the function
  level2(),
  level3(),
  level4(),   // Add this
];

export { level1, level2, level3, level4 }; // Add level4 here
```

### 3. That's it! Your level is now playable!

## Level Configuration Options

### Required Fields

- **id**: Unique number identifier for the level
- **name**: Display name for the level (use emojis!)
- **description**: Short description of the level goal
- **gridSize**: Size of the grid (5 = 5x5, 6 = 6x6, etc.)
- **initialPlayer**: Starting position `{ x: 0, y: 0 }`
- **goal**: Goal position `{ x: 4, y: 4 }`
- **playerEmoji**: Emoji for the player (default: 🦘)
- **goalEmoji**: Emoji for the goal
- **maxCommands**: Maximum number of commands allowed
- **successMessage**: Message shown when level is completed
- **failMessage**: Message shown when player doesn't reach goal

### Optional Fields

- **obstacles**: Array of obstacles to avoid
  ```typescript
  obstacles: [
    { position: { x: 2, y: 1 }, emoji: "🐨", type: "koala" },
    { position: { x: 2, y: 2 }, emoji: "🌴", type: "tree" },
  ]
  ```

## Level Design Tips

1. **Start Simple**: Begin with no obstacles for early levels
2. **Increase Difficulty**: Add more obstacles or larger grids
3. **Theme Your Levels**: Use different animals, sports, or environments
4. **Test Your Level**: Make sure it's solvable with the max commands!
5. **Use Creative Emojis**: Make levels visually interesting

## Example Level Ideas

- 🎾 Tennis Challenge
- 🏐 Volleyball Match
- 🎯 Dart Target
- 🎪 Circus Performance
- 🌊 Ocean Adventure
- 🚀 Space Journey
- 🏔️ Mountain Climb
- 🌺 Garden Maze

## File Structure

```
src/
├── components/
│   └── GameRunner.tsx    # Game logic and UI
├── levels/
│   ├── index.ts          # Export all levels here
│   ├── level1.ts         # Level definitions
│   ├── level2.ts
│   └── level3.ts
├── types/
│   └── game.types.ts     # Type definitions
└── App.tsx               # Level selector
```

Happy level creating! 🎮
