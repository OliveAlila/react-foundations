import type { TimerMode } from "../types/timer";

interface TimerProps {
  timeLeft: number;
  mode: TimerMode;
}

function Timer({ timeLeft, mode }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const modeName =
    mode === "work"
      ? "Work"
      : mode === "shortBreak"
      ? "Short Break"
      : "Long Break";

  return (
    <div className="timer">
      <p className="mode">{modeName}</p>

      <h1>
        {formattedMinutes}:{formattedSeconds}
      </h1>
    </div>
  );
}

export default Timer;