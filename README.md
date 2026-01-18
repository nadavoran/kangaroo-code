# 🦘 Kangaroo Code

**Kangaroo Code** is a fun, Australian-themed educational game designed to introduce children (6+ years) to the fundamental logic of computer programming through interactive play. Available as a Progressive Web App (PWA) that works offline on all devices!

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
- **Loops (Optional):** Introducing repetition with the Repeat block feature
- **Collectibles:** Gathering treats (cookies, fruit) for extra points and rewards

---

## 🎮 How to Play

1. **Enable Loop Mode (Optional):** Toggle the Loop Mode switch on the main menu to enable advanced Repeat blocks
2. **Select a Level:** Choose from 7 different levels with varying difficulty
3. **Analyze the Grid:** 
   - Look at where the Kangaroo 🦘 and the goal are located
   - Coordinate numbers appear on the edges (like a chess board!)
4. **Build Your Program:** 
   - Click the arrow buttons (⬆️, ⬇️, ⬅️, ➡️) to add directional commands
   - **Loop Mode**: Click **🔁 Repeat** to create loop blocks (e.g., "5×➡️" = move right 5 times)
   - Commands appear in the order you add them
   - **Drag & drop** to reorder commands
   - Click a command to select it, then click an arrow to replace it
   - **Drag to trash** 🗑️ or click the remove (×) button to delete
5. **Avoid Obstacles:** Make sure your path doesn't land on obstacles
6. **Run the Code:** Press the large **▶️ RUN** button and watch the Kangaroo execute your instructions
7. **Collect Treats:** Try to hop onto squares with treats (🍪, 🍎, 🥕, etc.) to collect them!
8. **Review Results:** 
  - ✅ Success: You reached the goal!
  - ❌ Failed: Hit an obstacle or missed the goal
  - Total treats collected are shown in the results and stats panel
  - Red-highlighted commands show wasted moves (in both command list and history)
9. **Iterate:** Press **🔄 RESET** to clear your commands and try again
10. **Navigate:** Press **⬅️ BACK** to return to level selection (uses browser back button)

---

## ✨ Feature Highlights

### 🎯 Core Features
- 🦘 **7 Progressive Levels** - From simple to complex challenges
- 🍪 **Collectibles** - Randomly generated treats for extra engagement
- 🔁 **Loop Mode** - Optional repeat blocks for advanced learning
- 📊 **History Panel** - Track all attempts with full replay capability
- 📊 **Stats Section** - View total treats and performance metrics
- 🗑️ **Drag to Delete** - Intuitive trash zone for removing commands
- 📍 **Grid Coordinates** - Chess-board style numbering system
- 🔄 **Random Levels** - Infinite practice with procedural generation
- 💾 **Offline Mode** - Full PWA with offline support
- 🎨 **Beautiful UI** - Modern gradients and smooth animations
- 📱 **Mobile First** - Optimized for touch devices
- ⌨️ **Keyboard Support** - Full keyboard navigation
- 🔙 **Browser Back** - Native browser navigation integration
- 🎯 **Smart Layout** - Prominent RUN button, organized actions

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
  - **Procedural Treats** - Random collectibles generated for every run
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

#### Command Management
- **Drag & Drop:** Reorder commands by dragging them anywhere in the sequence
- **Drag to Delete:** Drag a command to the trash zone 🗑️ to remove it
- **Replace Mode:** Click a command to select it (pulsing blue highlight), then click an arrow to replace
- **Select & Replace:** Selected commands can be swapped with a single click

#### Loop System (Toggle On/Off)
- **Loop Mode Toggle:** Beautiful animated switch on the main menu
- **Repeat Blocks:** Create loops like "3×⬆️" instead of "⬆️⬆️⬆️"
- **Interactive Modal:** 
  - Select repeat count (2-10)
  - Choose direction with visual buttons
  - Preview: Shows as "count×direction" (e.g., "5×➡️")
- **Smart Execution:** Loops execute step-by-step with proper animation

#### Visual Feedback
- **Grid Coordinates:** Chess-board style numbers on edges for easy reference
- **Command Highlighting:** 
  - Executing command pulses and scales during runtime
  - Selected commands have blue pulsing border
  - Wasted commands marked with red background
- **Animations:**
  - Green success celebration with scaling and rotation
  - Red failure shake
  - Smooth command transitions
  - Kangaroo flips horizontally for authentic Australian feel!

#### Scoring & History
- **Score Tracking:** Counts mistakes (wasted moves that had no effect)
- **Treat Collection:** Tracks total treats gathered across successful runs
- **Stats Panel:** Displays both mistakes and collected treats after each run
- **Replay History Panel:** 
 - Collapsible bottom drawer (mobile) or side panel (desktop)
 - All attempts saved with timestamp
 - Success/failure indicators (✅/❌)
 - Shows exact commands used
 - **Treat count preserved** in history for each attempt
 - **Wasted commands highlighted** in red in history
 - Click to load previous attempt
 - Click "▶️ Play" to watch automatic replay
 - History preserves exact obstacle and treat layouts for random levels

#### Navigation
- **Browser Back Button Support:** Navigate back from levels using browser/device back button
- **Exit Warning:** Warns before leaving the game from main menu
- **History State:** Full browser history integration with proper state management

### 🔄 Random Level Generation

- Levels 4-7 feature **procedurally generated layouts**
- **Procedural Treats:** Collectibles are automatically placed in reachable positions
- Click **⏭️ NEXT** button to get a new random layout
- **Path Validation:** Every generated board is guaranteed to have at least one valid solution
- **BFS Algorithm:** Uses Breadth-First Search to verify solvability before presenting the puzzle
- History preserves each unique layout (including obstacles and treats) for replay

---

## 🎨 UI/UX Features

### Modern Design
- **Gradient Buttons:** Beautiful color gradients for visual appeal
- **Smooth Animations:** CSS3 transitions and transforms throughout
- **Responsive Layout:** Optimized for all screen sizes (mobile-first design)
- **Touch-Friendly:** Large tap targets (44px minimum) for mobile devices
- **Visual Hierarchy:** Clear button sizing (large RUN button, smaller secondary actions)

### Accessibility
- **Keyboard Navigation:** Full keyboard support
- **Focus Indicators:** Visible focus states for keyboard users
- **High Contrast:** Good color contrast ratios
- **Touch Targets:** Proper spacing between interactive elements
- **Reduced Motion:** Respects `prefers-reduced-motion` setting

### Mobile Optimizations
- **Adaptive Layout:** Same layout structure across all screen sizes
- **Safe Areas:** Respects device notches and rounded corners
- **Pull-to-Refresh:** Prevented for app-like feel
- **Viewport Fit:** Covers full screen on modern devices
- **Collapsible History:** Bottom drawer on mobile, side panel on desktop

### Visual Feedback
- **Button States:** Hover, active, disabled, and focus states
- **Loading States:** Clear indication when code is running
- **Success/Failure:** Distinct animations for different outcomes
- **Command Execution:** Real-time visualization of program execution
- **Mistake Highlighting:** Visual indicators for debugging

---

## 🛠️ Tech Stack

This app is built using modern web technologies:

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **@dnd-kit** for drag-and-drop functionality
- **CSS3** with custom animations and transitions
- **Progressive Web App (PWA)** with offline support

### PWA Features
- **Installable:** Add to home screen on mobile and desktop
- **Offline-First:** Works without internet connection
- **App-Like Experience:** Full-screen mode, splash screen
- **Optimized Caching:** Fast load times with service worker
- **Cross-Platform:** iOS, Android, Windows, macOS, Linux

### Algorithms
- **BFS (Breadth-First Search)** for path validation
- **Random generation** with solvability guarantees
- **History API** for browser navigation integration

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

## 📱 Browser & Device Support

### Supported Browsers
- ✅ **Chrome/Edge** (recommended) - Full PWA support
- ✅ **Safari** (iOS/macOS) - Full PWA support
- ✅ **Firefox** - Works great, limited PWA features
- ✅ **Samsung Internet** - Full Android PWA support

### Supported Devices
- 📱 **Smartphones** (iOS 12+, Android 5+)
- 📱 **Tablets** (iPad, Android tablets)
- 💻 **Desktop** (Windows, macOS, Linux)
- 🖥️ **Chromebooks** - Perfect for classroom use!

### Screen Sizes
- Optimized for 320px to 4K displays
- Responsive breakpoints at 480px, 768px, 1024px
- Works in portrait and landscape orientations
- Adapts to touch and mouse input

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

### PWA Installation

After deploying, users can install the app:

**On Mobile (iOS/Android):**
1. Open in Safari (iOS) or Chrome (Android)
2. Tap the share/menu button
3. Select "Add to Home Screen"
4. The app will launch like a native app!

**On Desktop (Chrome/Edge):**
1. Click the install icon in the address bar
2. Or go to Menu → Install Kangaroo Code
3. The app will open in its own window!

**Offline Support:**
- Once installed, works completely offline
- All levels, animations, and features available
- Perfect for areas with poor connectivity

---

## 🎓 Educational Value

### For Children
- **Visual Learning:** See code execution in real-time with smooth animations
- **Immediate Feedback:** Understand what went wrong and try again instantly
- **Progressive Difficulty:** Start easy, build confidence, tackle harder challenges
- **Problem-Solving:** Develop critical thinking and planning skills
- **Persistence:** Learn that debugging and iteration are part of programming
- **Loop Introduction:** Optional loop mode introduces the concept of repetition
- **Coordinate System:** Learn X,Y coordinates through grid numbering
- **Spatial Reasoning:** Develop mental mapping and navigation skills

### For Educators
- **Unplugged Computing:** Introduces programming without syntax complexity
- **Scalable Difficulty:** 7 levels from beginner to advanced
- **Assessment Tool:** History feature shows student attempts and strategies
- **Differentiation:** Random levels provide unlimited practice at each difficulty
- **STEAM Integration:** Combines logic, spatial reasoning, and computational thinking
- **Offline Access:** Install as PWA for classroom use without internet
- **Loop Curriculum:** Toggle loops on/off to match lesson plans
- **Progress Tracking:** History panel shows learning progression
- **Mistake Analysis:** Wasted commands highlight inefficient thinking patterns

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
 collectibles: [
   { position: { x: 1, y: 1 }, emoji: "🍪", type: "treat" },
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

### Implemented Features ✅
- ✅ Drag-and-drop command reordering
- ✅ Drag-to-delete with trash zone
- ✅ Loop/Repeat blocks (toggleable)
- ✅ History panel with replay
- ✅ Wasted command highlighting
- ✅ Browser back button support
- ✅ Grid coordinate numbers
- ✅ Progressive Web App (PWA)
- ✅ Offline support
- ✅ Mobile-optimized layout
- ✅ Random level generation
- ✅ Beautiful animations

### Future Enhancements 🚀
- Sound effects and background music
- Additional level themes
- Tutorial/onboarding mode
- Achievement system
- Leaderboards (local/global)
- More loop types (while, for)
- If/else conditional blocks
- Variable/function concepts
- Localization/translations
- Accessibility enhancements (screen reader support)
- Level editor/creator mode
- Share custom levels

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
