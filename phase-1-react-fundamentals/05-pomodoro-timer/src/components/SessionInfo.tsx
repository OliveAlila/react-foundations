interface SessionInfoProps {
  completedSessions: number;
}

function SessionInfo({ completedSessions }: SessionInfoProps) {
  return (
    <div className="session-info">
      <p>Sessions completed</p>

      <h2>{completedSessions}</h2>

      <p>
        {completedSessions === 1
          ? "Great start!"
          : completedSessions === 0
          ? "Let's get started!"
          : "Keep going!"}
      </p>
    </div>
  );
}

export default SessionInfo;