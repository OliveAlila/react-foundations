import { useEffect, useState } from "react";
import Timer from "./components/Timer";
import TimerControls from "./components/TimerControls";
import SessionInfo from "./components/SessionInfo";
import type { TimerMode } from "./types/timer";
import "./App.css";

const WORK_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

function App() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft !== 0) {
      return;
    }

    if (mode === "work") {
      const newCompletedSessions = completedSessions + 1;

      setCompletedSessions(newCompletedSessions);

      if (newCompletedSessions % 4 === 0) {
        setMode("longBreak");
        setTimeLeft(LONG_BREAK_TIME);
      } else {
        setMode("shortBreak");
        setTimeLeft(SHORT_BREAK_TIME);
      }
    } else {
      setMode("work");
      setTimeLeft(WORK_TIME);
    }

    setIsRunning(false);
  }, [timeLeft, mode, completedSessions]);

  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.title = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")} - Pomodoro`;
  }, [timeLeft]);

  const handleStartPause = () => {
    setIsRunning((currentState) => !currentState);
  };

  const handleReset = () => {
    setIsRunning(false);

    if (mode === "work") {
      setTimeLeft(WORK_TIME);
    } else if (mode === "shortBreak") {
      setTimeLeft(SHORT_BREAK_TIME);
    } else {
      setTimeLeft(LONG_BREAK_TIME);
    }
  };

  const handleSkip = () => {
    setIsRunning(false);

    if (mode === "work") {
      setMode("shortBreak");
      setTimeLeft(SHORT_BREAK_TIME);
    } else {
      setMode("work");
      setTimeLeft(WORK_TIME);
    }
  };

  const totalTime =
    mode === "work"
      ? WORK_TIME
      : mode === "shortBreak"
      ? SHORT_BREAK_TIME
      : LONG_BREAK_TIME;

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <main className="app">
      <div className="pomodoro-container">
        <h1>Pomodoro Timer</h1>

        <p className="description">
          Focus for 25 minutes, then take a break.
        </p>

        <div className="timer-card">
          <Timer timeLeft={timeLeft} mode={mode} />

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <TimerControls
            isRunning={isRunning}
            onStartPause={handleStartPause}
            onReset={handleReset}
            onSkip={handleSkip}
          />
        </div>

        <SessionInfo completedSessions={completedSessions} />
      </div>
    </main>
  );
}

export default App;