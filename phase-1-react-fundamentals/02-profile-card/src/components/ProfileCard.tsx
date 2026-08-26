import { useState } from "react";

function ProfileCard() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="profile-card">
      <img
        className="profile-image"
        src="https://i.pravatar.cc/150?img=47"
        alt="Profile"
      />

      <h2>Olive Alila</h2>

      <p className="role">Aspiring DevOps Engineer</p>

      <p className="bio">
        Software development student who enjoys building things,
        learning about cloud technology, and solving problems with code.
      </p>

      <div className="skills">
        <span>React</span>
        <span>Python</span>
        <span>AWS</span>
      </div>

      <button onClick={handleFollow}>
        {isFollowing ? "Following ✓" : "Follow"}
      </button>
    </div>
  );
}

export default ProfileCard;