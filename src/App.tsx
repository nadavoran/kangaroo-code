import { useState, useEffect } from "react";
import "./App.css";
import { GameRunner } from "./components/GameRunner";
import { getAllLevels } from "./levels";
import type { LevelConfig } from "./types/game.types";

function App() {
  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [levelRefreshKey, setLevelRefreshKey] = useState<number>(0);
  const [loopModeEnabled, setLoopModeEnabled] = useState<boolean>(false);

  // Handle browser back button navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.levelId !== undefined) {
        // Going back to a level or main view
        setCurrentLevelId(event.state.levelId);
        setLevelRefreshKey(event.state.refreshKey || 0);
      } else {
        // User is trying to go back from main view - warn them
        const confirmLeave = window.confirm(
          "Are you sure you want to leave Kangaroo Code?"
        );
        if (!confirmLeave) {
          // Push state back to keep them on the page
          window.history.pushState(
            { levelId: null, refreshKey: 0 },
            "",
            window.location.href
          );
        }
      }
    };

    // Set initial state
    if (!window.history.state) {
      window.history.replaceState(
        { levelId: null, refreshKey: 0 },
        "",
        window.location.href
      );
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleLevelSelect = (level: LevelConfig) => {
    setCurrentLevelId(level.id);
    setLevelRefreshKey(0);
    // Push new state to browser history
    window.history.pushState(
      { levelId: level.id, refreshKey: 0 },
      "",
      window.location.href
    );
  };

  const handleLevelComplete = () => {
    // You can add logic here to unlock next level or show completion screen
    console.log("Level completed!");
  };

  const handleBack = () => {
    // Use browser back instead of direct state change
    window.history.back();
    setCurrentLevelId(null);
    setLevelRefreshKey(0);
  };

  const handleNextLevel = () => {
    // Increment key to force level regeneration for random levels
    const newRefreshKey = levelRefreshKey + 1;
    setLevelRefreshKey(newRefreshKey);
    // Update history state with new refresh key
    window.history.replaceState(
      { levelId: currentLevelId, refreshKey: newRefreshKey },
      "",
      window.location.href
    );
  };

  // Get fresh levels every render (HMR support)
  const allLevels = getAllLevels();
  const currentLevel = allLevels.find((l) => l.id === currentLevelId);

  if (currentLevel) {
    return (
      <GameRunner
        key={`${currentLevel.id}-${levelRefreshKey}`}
        level={currentLevel}
        loopMode={loopModeEnabled}
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
        <div className="level-selector-header">
          <h2>Select a Level</h2>
          <div className="loop-toggle-container">
            <span className="loop-toggle-text">Loop Mode</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={loopModeEnabled}
                onChange={(e) => setLoopModeEnabled(e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-icon">
                {loopModeEnabled ? "🔁" : "➡️"}
              </span>
            </label>
          </div>
        </div>
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
