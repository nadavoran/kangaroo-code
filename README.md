# 🦘 Kangaroo Code

**Kangaroo Code** is a fun, Australian-themed educational game designed to introduce children (6+ years) to the fundamental logic of computer programming through interactive play.

![Kangaroo Code](public/kangaroo.svg)

---

## 🇦🇺 What is Kangaroo Code?

In the Australian Outback, a sporty Kangaroo wants to reach various goals - from soccer balls to basketballs, and even diamonds! However, the path isn't always clear. Sometimes obstacles like sleepy Koalas, palm trees, or rocks are blocking the way.

Instead of moving the Kangaroo directly with a joystick, players must **write a program** (a sequence of commands) to tell the Kangaroo exactly where to hop.

### 🧠 Coding Concepts Learned

- **Sequencing:** Understanding that computers follow instructions in a specific order
- **Algorithm Design:** Planning a step-by-step solution to reach a goal
- **Pathfinding:** Navigating around obstacles (spatial reasoning)
- **Debugging:** Identifying which specific command caused a "crash" or missed goal
- **Optimization:** Finding the most efficient path with the fewest commands
- **Pattern Recognition:** Understanding repeatable strategies across different puzzles

---

## 🎮 How to Play

1. **Select a Level:** Choose from 7 different levels with varying difficulty
2. **Analyze the Grid:** Look at where the Kangaroo 🦘 and the goal are located
3. **Build Your Program:** Click the arrow buttons (⬆️, ⬇️, ⬅️, ➡️) to add commands
   - Commands appear in the order you add them
   - You can drag-and-drop to reorder commands
   - Click a command to select it, then click an arrow to replace it
   - Hover over a command to see the remove (×) button
4. **Avoid Obstacles:** Make sure your path doesn't land on obstacles
5. **Run the Code:** Press the **▶️ RUN** button and watch the Kangaroo execute your instructions
6. **Review Results:** 
   - ✅ Success: You reached the goal!
   - ❌ Failed: Hit an obstacle or missed the goal
   - Red-highlighted commands show wasted moves
7. **Iterate:** Press **🔄 RESET** to clear your commands and try again

---

## 🎯 Game Features

### 📊 7 Progressive Levels

1. **Level 1 - Kangaroo Kick** 🌟
   - Simple 5×5 grid
   - No obstacles
   - Perfect for learning basic movement

2. **Level 2 - Sleepy Koalas** 🐨
   - 5×5 grid with 3 koala obstacles
   - Learn to navigate around barriers

3. **Level 3 - Basketball Challenge** 🏀
   - 5×5 grid with 5 palm tree obstacles
   - More complex pathfinding required

4. **Level 4 - Random Simple** 🌟
   - 5×5 grid with 1-2 random obstacles
   - **New layout every time** - click "NEXT" for a fresh challenge
   - Guaranteed solvable

5. **Level 5 - Random Easy** 🎲
   - 5×5 grid with 3-5 random obstacles
   - Dynamic challenges
   - Always has at least one valid path

6. **Level 6 - Random Medium** 🎯
   - **Variable grid size: 5×5, 6×6, or 7×7**
   - 6-9 obstacles with pattern formations
   - Increased complexity
   - Max commands scale with board size

7. **Level 7 - Random Hard** 🔥
   - **Variable grid size: 6×6, 7×7, or 8×8**
   - 11-16 obstacles with complex patterns
   - Diagonal lines, L-shapes, and cross formations
   - Ultimate challenge for coding masters

### 🎨 Interactive Features

- **Drag & Drop:** Reorder commands by dragging them
- **Replace Mode:** Click a command to select it, then click an arrow to replace
- **Visual Feedback:** 
  - Highlighted command during execution
  - Green success animation
  - Red failure shake
  - Wasted commands marked in red background
- **Score Tracking:** Counts mistakes (wasted moves)
- **Replay History:** 
  - All attempts are saved
  - Click on a previous attempt to load those commands
  - Click "Play" to watch a replay
  - History preserves exact obstacle layouts for random levels

### 🔄 Random Level Generation

- Levels 4-7 feature **procedurally generated layouts**
- Click **⏭️ NEXT** button to get a new random layout
- **Path Validation:** Every generated board is guaranteed to have at least one valid solution
- **BFS Algorithm:** Uses Breadth-First Search to verify solvability before presenting the puzzle
- History preserves each unique layout for replay

---

## 🛠️ Tech Stack

This app is built using modern web technologies:

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **@dnd-kit** for drag-and-drop functionality
- **CSS3** with custom animations

### Algorithms
- **BFS (Breadth-First Search)** for path validation
- **Random generation** with solvability guarantees

### Code Structure
```
src/
├── components/
│   └── GameRunner.tsx       # Main game component
├── levels/
│   ├── level1.ts            # Static level definitions
│   ├── level2.ts
│   ├── level3.ts
│   ├── level4.ts            # Random simple
│   ├── level5.ts            # Random easy
│   ├── level6.ts            # Random medium
│   ├── level7.ts            # Random hard
│   └── index.ts             # Level exports
├── types/
│   └── game.types.ts        # TypeScript interfaces
├── utils/
│   └── pathfinding.ts       # BFS path validation
├── App.tsx                  # Main app component
├── App.css                  # Styles
└── main.tsx                 # Entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kangaroo-code
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

---

## 🎓 Educational Value

### For Children
- **Visual Learning:** See code execution in real-time
- **Immediate Feedback:** Understand what went wrong and try again
- **Progressive Difficulty:** Start easy, build confidence, tackle harder challenges
- **Problem-Solving:** Develop critical thinking and planning skills
- **Persistence:** Learn that debugging and iteration are part of programming

### For Educators
- **Unplugged Computing:** Introduces programming without syntax complexity
- **Scalable Difficulty:** 7 levels from beginner to advanced
- **Assessment Tool:** History feature shows student attempts and strategies
- **Differentiation:** Random levels provide unlimited practice at each difficulty
- **STEAM Integration:** Combines logic, spatial reasoning, and computational thinking

---

## 🎯 Creating Custom Levels

Want to add your own levels? It's easy!

1. Create a new file in `src/levels/` (e.g., `level8.ts`)
2. Define your level configuration:

```typescript
import type { LevelConfig } from "../types/game.types";

export const level8 = (): LevelConfig => ({
  id: 8,
  name: "🌈 Level 8: Your Custom Level",
  description: "Your custom challenge!",
  gridSize: 5,
  initialPlayer: { x: 0, y: 0 },
  goal: { x: 4, y: 4 },
  playerEmoji: "🦘",
  goalEmoji: "🎁",
  obstacles: [
    { position: { x: 2, y: 2 }, emoji: "🌳", type: "tree" },
    // Add more obstacles...
  ],
  maxCommands: 10,
  successMessage: "Amazing! You did it! 🎉",
  failMessage: "Try again! 🦘",
  isRandom: false, // Set to true for random generation
});
```

3. Export your level in `src/levels/index.ts`:
```typescript
import { level8 } from "./level8";
export const getAllLevels = (): LevelConfig[] => [
  level1(), level2(), level3(), level4(), 
  level5(), level6(), level7(), level8()
];
```

### For Random Levels

See `level4.ts` through `level7.ts` for examples of random level generation with:
- Path validation using BFS
- Random obstacle placement
- Variable grid sizes
- Pattern generation (lines, L-shapes, crosses)

---

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

- Additional level designs
- New obstacle types
- Sound effects
- Animation improvements
- Accessibility enhancements
- Localization/translations
- Tutorial mode
- Achievement system

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Inspired by educational programming games like LightBot and CodeCombat
- Built with love for young learners exploring computer science
- Australian theme celebrates our unique wildlife 🇦🇺

---

## 📧 Contact

For questions, suggestions, or feedback, please open an issue on GitHub.

---

**Happy Coding! 🦘💻**
