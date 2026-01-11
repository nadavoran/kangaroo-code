import { useState } from "react";
import "./App.css";
import { GameRunner } from "./components/GameRunner";
import { getAllLevels } from "./levels";
import type { LevelConfig } from "./types/game.types";

function App() {
  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [levelRefreshKey, setLevelRefreshKey] = useState<number>(0);

  const handleLevelSelect = (level: LevelConfig) => {
    setCurrentLevelId(level.id);
    setLevelRefreshKey(0);
  };

  const handleLevelComplete = () => {
    // You can add logic here to unlock next level or show completion screen
    console.log("Level completed!");
  };

  const handleBack = () => {
    setCurrentLevelId(null);
    setLevelRefreshKey(0);
  };

  const handleNextLevel = () => {
    // Increment key to force level regeneration for random levels
    setLevelRefreshKey((prev) => prev + 1);
  };

  // Get fresh levels every render (HMR support)
  const allLevels = getAllLevels();
  const currentLevel = allLevels.find((l) => l.id === currentLevelId);

  if (currentLevel) {
    return (
      <GameRunner
        key={`${currentLevel.id}-${levelRefreshKey}`}
        level={currentLevel}
        onLevelComplete={handleLevelComplete}
        onBack={handleBack}
        onNextLevel={handleNextLevel}
      />
    );
  }

  return (
    <div className="game-container">
      <h1>
        <span className="kangaroo">🦘</span> Kangaroo Code
      </h1>
      <p className="subtitle">
        Learn to code by helping animals reach their goals!
      </p>

      <div className="level-selector">
        <h2>Select a Level</h2>
        <div className="level-grid">
          {allLevels.map((level) => (
            <button
              key={level.id}
              className="level-card"
              onClick={() => handleLevelSelect(level)}
            >
              <div className="level-emoji">
                {level.playerEmoji} {level.goalEmoji}
              </div>
              <h3>Level {level.id}</h3>
              <p>{level.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
