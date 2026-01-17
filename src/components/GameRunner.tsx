import { useState, useEffect } from "react";
import type {
  Command,
  Direction,
  LevelConfig,
  Position,
} from "../types/game.types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import type { DragEndEvent, Over } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../App.css";

interface GameRunnerProps {
  level: LevelConfig;
  loopMode?: boolean;
  onLevelComplete?: () => void;
  onBack?: () => void;
  onNextLevel?: () => void;
}

interface SortableCommandItemProps {
  id: string;
  command: Command;
  index: number;
  isExecuting: boolean;
  isWasted: boolean;
  isSelected: boolean;
  isRunning: boolean;
  onSelect: () => void;
  onRemove: () => void;
  getCommandEmoji: (cmd: Command) => React.ReactNode;
}

function SortableCommandItem({
  id,
  command,
  isExecuting,
  isWasted,
  isSelected,
  isRunning,
  onSelect,
  onRemove,
  getCommandEmoji,
}: SortableCommandItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transform ? transition : "none",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`command-item ${isSelected ? "selected" : ""}`}
      {...attributes}
    >
      <span
        className={`command-emoji ${isExecuting ? "executing" : ""} ${
          isWasted ? "wasted" : ""
        }`}
        {...listeners}
        onClick={() => {
          if (!isRunning && !isDragging) {
            onSelect();
          }
        }}
        style={{ cursor: isRunning ? "default" : "grab" }}
      >
        {getCommandEmoji(command)}
      </span>
      {!isRunning && isSelected && (
        <button
          className="remove-cmd-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          title="Remove command"
        >
          ×
        </button>
      )}
    </div>
  );
}

function TrashZone({ isOver }: { isOver: boolean }) {
  const { setNodeRef } = useDroppable({
    id: "trash-zone",
  });

  return (
    <div
      ref={setNodeRef}
      className={`trash-zone ${isOver ? "trash-over" : ""}`}
    >
      <span className="trash-icon">🗑️</span>
      {isOver && <span className="trash-text">Drop to delete</span>}
    </div>
  );
}

export function GameRunner({
  level,
  loopMode = false,
  onLevelComplete,
  onBack,
  onNextLevel,
}: GameRunnerProps) {
  const [playerPos, setPlayerPos] = useState<Position>(level.initialPlayer);
  const [commands, setCommands] = useState<Command[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [currentCommandIndex, setCurrentCommandIndex] = useState<number>(-1);
  const [hasFailed, setHasFailed] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [wastedCommands, setWastedCommands] = useState<number[]>([]);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState<number>(-1);
  const [history, setHistory] = useState<
    Array<{
      id: number;
      commands: Command[];
      success: boolean;
      mistakes: number;
      wastedIndexes: number[];
      timestamp: Date;
      obstacles?: typeof level.obstacles;
    }>
  >([]);
  const [currentLevelSnapshot, setCurrentLevelSnapshot] =
    useState<LevelConfig>(level);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [isDraggingOverTrash, setIsDraggingOverTrash] = useState(false);
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const [repeatCount, setRepeatCount] = useState(2);
  const [repeatDirection, setRepeatDirection] = useState<Direction>("Right");

  // Reset game when level changes (for HMR support)
  useEffect(() => {
    setPlayerPos(level.initialPlayer);
    setCommands([]);
    setIsRunning(false);
    setMessage("");
    setCurrentCommandIndex(-1);
    setHasFailed(false);
    setHasSucceeded(false);
    setMistakes(0);
    setWastedCommands([]);
    setSelectedCommandIndex(-1);
    setHistory([]);
    setCurrentLevelSnapshot(level);
  }, [level]);

  const addCommand = (cmd: Command) => {
    if (!isRunning) {
      // If a command is selected, replace it
      if (selectedCommandIndex >= 0) {
        replaceCommand(selectedCommandIndex, cmd);
        setSelectedCommandIndex(-1);
      } else if (commands.length < level.maxCommands) {
        // Otherwise add new command
        setCommands([...commands, cmd]);
      }
    }
  };

  const removeCommand = (index: number) => {
    if (!isRunning) {
      setCommands(commands.filter((_, i) => i !== index));
    }
  };

  const replaceCommand = (index: number, newCmd: Command) => {
    if (!isRunning) {
      const newCommands = [...commands];
      newCommands[index] = newCmd;
      setCommands(newCommands);
    }
  };

  const resetGame = () => {
    setPlayerPos(level.initialPlayer);
    setCommands([]);
    setIsRunning(false);
    setMessage("");
    setCurrentCommandIndex(-1);
    setHasFailed(false);
    setHasSucceeded(false);
    setMistakes(0);
    setWastedCommands([]);
    setSelectedCommandIndex(-1);
  };

  const checkCollision = (x: number, y: number): boolean => {
    if (!currentLevelSnapshot.obstacles) return false;
    return currentLevelSnapshot.obstacles.some(
      (obstacle) => obstacle.position.x === x && obstacle.position.y === y
    );
  };

  const runCode = async (skipHistory = false) => {
    setIsRunning(true);
    setMessage("Running...");
    setHasFailed(false);
    setHasSucceeded(false);
    setCurrentCommandIndex(-1);
    setMistakes(0);
    setWastedCommands([]);

    // Use a local position variable to track movement during the loop
    let currentX = level.initialPlayer.x;
    let currentY = level.initialPlayer.y;
    let mistakeCount = 0;
    const wastedIndexes: number[] = [];

    // Reset player visual position first
    setPlayerPos({ x: currentX, y: currentY });
    await new Promise((r) => setTimeout(r, 500));

    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i];
      setCurrentCommandIndex(i);

      // Handle repeat commands
      if (typeof cmd === "object" && cmd.type === "Repeat") {
        const repeatCount = cmd.count;
        const direction = cmd.command;

        for (let r = 0; r < repeatCount; r++) {
          let nextX = currentX;
          let nextY = currentY;

          // Calculate next position for the repeated direction
          if (direction === "Up" && currentY > 0) nextY--;
          if (
            direction === "Down" &&
            currentY < currentLevelSnapshot.gridSize - 1
          )
            nextY++;
          if (direction === "Left" && currentX > 0) nextX--;
          if (
            direction === "Right" &&
            currentX < currentLevelSnapshot.gridSize - 1
          )
            nextX++;

          // Check if the move had no effect (wasted action)
          if (nextX === currentX && nextY === currentY) {
            mistakeCount++;
            wastedIndexes.push(i);
            setWastedCommands([...wastedIndexes]);
            setMistakes(mistakeCount);
            break; // Stop repeating if we can't move
          }

          // Check if the next position has an obstacle
          if (checkCollision(nextX, nextY)) {
            setMessage("Oops! Hit an obstacle! Try again. 💥");
            setHasFailed(true);
            setIsRunning(false);
            setCurrentCommandIndex(-1);
            setMistakes(mistakeCount);
            setWastedCommands(wastedIndexes);

            if (!skipHistory) {
              setHistory((prev) => [
                {
                  id: Date.now(),
                  commands: [...commands],
                  success: false,
                  mistakes: mistakeCount,
                  wastedIndexes: [...wastedIndexes],
                  timestamp: new Date(),
                  obstacles: currentLevelSnapshot.obstacles
                    ? JSON.parse(JSON.stringify(currentLevelSnapshot.obstacles))
                    : undefined,
                },
                ...prev,
              ]);
            }
            return;
          }

          currentX = nextX;
          currentY = nextY;
          setPlayerPos({ x: currentX, y: currentY });
          await new Promise((r) => setTimeout(r, 500));
        }
      } else {
        // Handle regular directional commands
        let nextX = currentX;
        let nextY = currentY;

        // Calculate next position (use currentLevelSnapshot for correct grid size)
        if (cmd === "Up" && currentY > 0) nextY--;
        if (cmd === "Down" && currentY < currentLevelSnapshot.gridSize - 1)
          nextY++;
        if (cmd === "Left" && currentX > 0) nextX--;
        if (cmd === "Right" && currentX < currentLevelSnapshot.gridSize - 1)
          nextX++;

        // Check if the command had no effect (wasted action)
        if (nextX === currentX && nextY === currentY) {
          mistakeCount++;
          wastedIndexes.push(i);
          // Mark as wasted immediately during execution
          setWastedCommands([...wastedIndexes]);
          setMistakes(mistakeCount);
        }

        // Check if the next position has an obstacle
        if (checkCollision(nextX, nextY)) {
          setMessage("Oops! Hit an obstacle! Try again. 💥");
          setHasFailed(true);
          setIsRunning(false);
          setCurrentCommandIndex(-1);
          setMistakes(mistakeCount);
          setWastedCommands(wastedIndexes);

          // Add to history when hitting obstacle
          if (!skipHistory) {
            setHistory((prev) => [
              {
                id: Date.now(),
                commands: [...commands],
                success: false,
                mistakes: mistakeCount,
                wastedIndexes: [...wastedIndexes],
                timestamp: new Date(),
                obstacles: currentLevelSnapshot.obstacles
                  ? JSON.parse(JSON.stringify(currentLevelSnapshot.obstacles))
                  : undefined,
              },
              ...prev,
            ]);
          }
          return;
        }

        currentX = nextX;
        currentY = nextY;

        setPlayerPos({ x: currentX, y: currentY });
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    setCurrentCommandIndex(-1);
    setMistakes(mistakeCount);
    setWastedCommands(wastedIndexes);

    const success =
      currentX === currentLevelSnapshot.goal.x &&
      currentY === currentLevelSnapshot.goal.y;

    if (success) {
      setHasSucceeded(true);
      const scoreMessage =
        mistakeCount === 0
          ? `${level.successMessage} Perfect! No mistakes! ⭐`
          : `${level.successMessage} Mistakes: ${mistakeCount}`;
      setMessage(scoreMessage);
      if (onLevelComplete) {
        setTimeout(() => onLevelComplete(), 1500);
      }
    } else {
      setMessage(level.failMessage);
      setHasFailed(true);
    }

    // Add to history
    if (!skipHistory) {
      setHistory((prev) => [
        {
          id: Date.now(),
          commands: [...commands],
          success,
          mistakes: mistakeCount,
          wastedIndexes: [...wastedIndexes],
          timestamp: new Date(),
          obstacles: currentLevelSnapshot.obstacles
            ? JSON.parse(JSON.stringify(currentLevelSnapshot.obstacles))
            : undefined,
        },
        ...prev,
      ]);
    }

    setIsRunning(false);
  };

  const getCommandEmoji = (cmd: Command): React.ReactNode => {
    if (typeof cmd === "object" && cmd.type === "Repeat") {
      const directionEmoji =
        cmd.command === "Up"
          ? "⬆️"
          : cmd.command === "Down"
          ? "⬇️"
          : cmd.command === "Left"
          ? "⬅️"
          : "➡️";
      return (
        <>
          <span className="command-emoji-count">{cmd.count}×</span>
          {directionEmoji}
        </>
      );
    }

    switch (cmd) {
      case "Up":
        return "⬆️";
      case "Down":
        return "⬇️";
      case "Left":
        return "⬅️";
      case "Right":
        return "➡️";
      default:
        return "❓";
    }
  };

  const isObstacle = (x: number, y: number): string | null => {
    if (!currentLevelSnapshot.obstacles) return null;
    const obstacle = currentLevelSnapshot.obstacles.find(
      (obs) => obs.position.x === x && obs.position.y === y
    );
    return obstacle ? obstacle.emoji : null;
  };

  const replayFromHistory = (
    historyCommands: Command[],
    historyObstacles?: typeof level.obstacles
  ) => {
    if (isRunning) return;
    setCommands(historyCommands);
    setPlayerPos(level.initialPlayer);
    setMessage("");
    setCurrentCommandIndex(-1);
    setHasFailed(false);
    setHasSucceeded(false);
    setMistakes(0);
    setWastedCommands([]);

    // If this is from a random level with saved obstacles, restore them
    if (historyObstacles) {
      setCurrentLevelSnapshot({
        ...level,
        obstacles: historyObstacles,
      });
    }
  };

  const playFromHistory = async (
    historyCommands: Command[],
    historyObstacles: typeof level.obstacles | undefined,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Prevent triggering the replay
    if (isRunning) return;
    setCommands(historyCommands);
    setPlayerPos(level.initialPlayer);
    setMessage("");
    setCurrentCommandIndex(-1);
    setHasFailed(false);
    setHasSucceeded(false);
    setMistakes(0);
    setWastedCommands([]);

    // If this is from a random level with saved obstacles, restore them
    if (historyObstacles) {
      setCurrentLevelSnapshot({
        ...level,
        obstacles: historyObstacles,
      });
    }

    // Wait a bit for state to update, then run without adding to history
    setTimeout(() => runCode(true), 100);
  };

  const handleNextLevel = () => {
    if (isRunning) return;

    // Regenerate the level if it's random (this will create new obstacles)
    if (onNextLevel) {
      onNextLevel();
    }
  };

  // Helper to wrap kangaroo emojis with a span for flipping
  const flipKangaroos = (text: string) => {
    const parts = text.split(/(🦘)/g);
    return parts.map((part, i) =>
      part === "🦘" ? (
        <span key={i} className="kangaroo">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver = (event: { over: Over | null }) => {
    setIsDraggingOverTrash(event.over?.id === "trash-zone");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDraggingOverTrash(false);

    if (!over) return;

    // Check if dropped on trash zone
    if (over.id === "trash-zone") {
      const indexToRemove = commands.findIndex(
        (_, i) => `command-${i}` === active.id
      );
      if (indexToRemove !== -1) {
        setCommands(commands.filter((_, i) => i !== indexToRemove));
      }
      return;
    }

    // Reorder commands if dropped on another command
    if (active.id !== over.id) {
      const oldIndex = commands.findIndex(
        (_, i) => `command-${i}` === active.id
      );
      const newIndex = commands.findIndex((_, i) => `command-${i}` === over.id);
      const newArray = arrayMove(commands, oldIndex, newIndex);
      setCommands(newArray);
    }
  };

  return (
    <div className="game-layout-mobile">
      <div className="game-container">
        <h1>{flipKangaroos(level.name)}</h1>
        <p className="level-description">{flipKangaroos(level.description)}</p>

        <div className="grid-container">
          {/* Top column labels */}
          <div className="grid-labels-top">
            {/* <div className="grid-label-spacer"></div> */}
            {Array.from({ length: currentLevelSnapshot.gridSize }).map(
              (_, x) => (
                <div key={`col-${x}`} className="grid-label grid-label-top">
                  {x}
                </div>
              )
            )}
          </div>

          <div className="grid-with-side-labels">
            {/* Left side labels */}
            <div className="grid-labels-left">
              {Array.from({ length: currentLevelSnapshot.gridSize }).map(
                (_, y) => (
                  <div key={`row-${y}`} className="grid-label grid-label-left">
                    {y}
                  </div>
                )
              )}
            </div>

            {/* The actual game grid */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${currentLevelSnapshot.gridSize}, 1fr)`,
              }}
            >
              {Array.from({
                length:
                  currentLevelSnapshot.gridSize * currentLevelSnapshot.gridSize,
              }).map((_, i) => {
                const x = i % currentLevelSnapshot.gridSize;
                const y = Math.floor(i / currentLevelSnapshot.gridSize);
                const isPlayer = playerPos.x === x && playerPos.y === y;
                const isGoal =
                  currentLevelSnapshot.goal.x === x &&
                  currentLevelSnapshot.goal.y === y;
                const obstacleEmoji = isObstacle(x, y);

                return (
                  <div
                    key={i}
                    className={`cell ${isPlayer ? "active" : ""} ${
                      isPlayer && hasFailed ? "failed" : ""
                    } ${isPlayer && hasSucceeded ? "success" : ""}`}
                  >
                    {isPlayer
                      ? currentLevelSnapshot.playerEmoji
                      : isGoal
                      ? currentLevelSnapshot.goalEmoji
                      : obstacleEmoji || ""}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="command-display">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
            >
              <div className="command-display-wrapper">
                {/* Left spacer to balance the trash on the right */}
                <div className="command-spacer"></div>

                <div className="command-list-center">
                  {commands.length === 0 ? (
                    <span className="command-placeholder">Add commands...</span>
                  ) : (
                    <SortableContext
                      items={commands.map((_, i) => `command-${i}`)}
                      strategy={horizontalListSortingStrategy}
                    >
                      {commands.map((c, i) => (
                        <SortableCommandItem
                          key={`command-${i}`}
                          id={`command-${i}`}
                          command={c}
                          index={i}
                          isExecuting={i === currentCommandIndex}
                          isWasted={wastedCommands.includes(i)}
                          isSelected={i === selectedCommandIndex}
                          isRunning={isRunning}
                          onSelect={() => {
                            setSelectedCommandIndex(i);
                          }}
                          onRemove={() => removeCommand(i)}
                          getCommandEmoji={getCommandEmoji}
                        />
                      ))}
                    </SortableContext>
                  )}
                  <span className="command-count">
                    ({commands.length}/{level.maxCommands})
                    {selectedCommandIndex >= 0 && (
                      <>
                        <span className="replace-hint">
                          {" "}
                          - Click arrow to replace
                        </span>
                        <button
                          className="cancel-replace-btn"
                          onClick={() => setSelectedCommandIndex(-1)}
                          title="Cancel replace mode"
                        >
                          ✕ Cancel
                        </button>
                      </>
                    )}
                  </span>
                </div>

                {!isRunning && (
                  <div className="trash-zone-container">
                    <TrashZone isOver={isDraggingOverTrash} />
                  </div>
                )}
              </div>
            </DndContext>
          </div>

          <div className="buttons">
            <button onClick={() => addCommand("Up")} disabled={isRunning}>
              ⬆️
            </button>
            <div className="row">
              <button onClick={() => addCommand("Left")} disabled={isRunning}>
                ⬅️
              </button>
              <button onClick={() => addCommand("Down")} disabled={isRunning}>
                ⬇️
              </button>
              <button onClick={() => addCommand("Right")} disabled={isRunning}>
                ➡️
              </button>
            </div>
            {loopMode && (
              <button
                className="repeat-btn"
                onClick={() => setShowRepeatModal(true)}
                disabled={isRunning}
              >
                🔁 Repeat
              </button>
            )}
          </div>

          <div className="actions">
            <div className="actions-primary">
              <button
                className="run-btn"
                onClick={() => runCode(false)}
                disabled={isRunning || commands.length === 0}
              >
                ▶️ RUN
              </button>
              <button
                className="reset-btn"
                onClick={resetGame}
                disabled={isRunning}
              >
                🔄 RESET
              </button>
              {level.isRandom && (
                <button
                  className="next-btn"
                  onClick={handleNextLevel}
                  disabled={isRunning}
                >
                  ⏭️ NEXT
                </button>
              )}
            </div>
            {onBack && (
              <div className="actions-secondary">
                <button
                  className="back-btn"
                  onClick={onBack}
                  disabled={isRunning}
                >
                  ⬅️ BACK
                </button>
              </div>
            )}
          </div>

          {message && <div className="message">{flipKangaroos(message)}</div>}
          {!isRunning && mistakes > 0 && (
            <div className="score-display">
              <p className="score-label">📊 Score</p>
              <p className="score-mistakes">
                Mistakes: <span className="mistake-count">{mistakes}</span>
              </p>
              <p className="score-hint">
                Red arrows show actions that had no effect
              </p>
            </div>
          )}
        </div>
      </div>

      {/* History Panel - Collapsible at Bottom */}
      <div
        className={`history-panel-bottom ${
          isHistoryExpanded ? "expanded" : "collapsed"
        }`}
      >
        <button
          className="history-toggle"
          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
          aria-label={isHistoryExpanded ? "Collapse history" : "Expand history"}
        >
          <span className="history-toggle-icon">
            {isHistoryExpanded ? "▼" : "▲"}
            {/* {isHistoryExpanded ? "▼" : "▲"} */}
          </span>
          <span className="history-toggle-text">
            📼 Replay History {history.length > 0 && `(${history.length})`}
          </span>
          <span
            className={`history-toggle-icon ${isHistoryExpanded && "expanded"}`}
          >
            ▲{/* {isHistoryExpanded ? "▼" : "▲"} */}
          </span>
        </button>

        {isHistoryExpanded && (
          <div className="history-content">
            {history.length === 0 ? (
              <p className="history-empty">
                No plays yet. Run your code to see history!
              </p>
            ) : (
              <div className="history-list">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className={`history-entry ${
                      entry.success ? "success-entry" : "fail-entry"
                    }`}
                  >
                    <div className="history-header">
                      <span className="history-status">
                        {entry.success ? "✅" : "❌"}
                      </span>
                      <span className="history-time">
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div
                      className="history-commands"
                      onClick={() =>
                        replayFromHistory(entry.commands, entry.obstacles)
                      }
                    >
                      {entry.commands.map((cmd, i) => (
                        <span
                          key={i}
                          className={`history-command-emoji ${
                            entry.wastedIndexes.includes(i)
                              ? "history-command-wasted"
                              : ""
                          }`}
                        >
                          {getCommandEmoji(cmd)}
                        </span>
                      ))}
                    </div>
                    <div className="history-footer">
                      <div className="history-stats">
                        <span className="history-stat">
                          {entry.commands.length} commands
                        </span>
                        {entry.mistakes > 0 && (
                          <span className="history-mistakes">
                            {entry.mistakes} mistakes
                          </span>
                        )}
                      </div>
                      <button
                        className="history-play-btn"
                        onClick={(e) =>
                          playFromHistory(entry.commands, entry.obstacles, e)
                        }
                        disabled={isRunning}
                      >
                        ▶️ Play
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Repeat Modal */}
      {showRepeatModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowRepeatModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Create Repeat Block</h3>
            <div className="modal-section">
              <label>Repeat Count:</label>
              <div className="repeat-count-selector">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    className={`count-btn ${
                      repeatCount === num ? "selected" : ""
                    }`}
                    onClick={() => setRepeatCount(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-section">
              <label>Direction:</label>
              <div className="repeat-direction-selector">
                <button
                  className={`dir-btn ${
                    repeatDirection === "Up" ? "selected" : ""
                  }`}
                  onClick={() => setRepeatDirection("Up")}
                >
                  ⬆️ Up
                </button>
                <button
                  className={`dir-btn ${
                    repeatDirection === "Left" ? "selected" : ""
                  }`}
                  onClick={() => setRepeatDirection("Left")}
                >
                  ⬅️ Left
                </button>
                <button
                  className={`dir-btn ${
                    repeatDirection === "Down" ? "selected" : ""
                  }`}
                  onClick={() => setRepeatDirection("Down")}
                >
                  ⬇️ Down
                </button>
                <button
                  className={`dir-btn ${
                    repeatDirection === "Right" ? "selected" : ""
                  }`}
                  onClick={() => setRepeatDirection("Right")}
                >
                  ➡️ Right
                </button>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="modal-add-btn"
                onClick={() => {
                  addCommand({
                    type: "Repeat",
                    count: repeatCount,
                    command: repeatDirection,
                  });
                  setShowRepeatModal(false);
                }}
              >
                Add Repeat Block
              </button>
              <button
                className="modal-cancel-btn"
                onClick={() => setShowRepeatModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
