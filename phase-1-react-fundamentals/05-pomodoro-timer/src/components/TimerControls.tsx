interface TimerControlsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

function TimerControls({
  isRunning,
  onStartPause,
  onReset,
  onSkip,
}: TimerControlsProps) {
  return (
    <div className="timer-controls">
      <button onClick={onStartPause} className="primary-button">
        {isRunning ? "Pause" : "Start"}
      </button>

      <button onClick={onReset}>Reset</button>

      <button onClick={onSkip}>Skip</button>
    </div>
  );
}

export default TimerControls;