import type { GitHubUser } from "../types/github";

interface UserProfileProps {
  user: GitHubUser;
}

function UserProfile({ user }: UserProfileProps) {
  const joinDate = new Date(user.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <section className="user-profile">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="avatar"
      />

      <div className="user-info">
        <h2>{user.name || user.login}</h2>

        <p className="username">@{user.login}</p>

        <p className="bio">
          {user.bio || "This user has no bio."}
        </p>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          View GitHub Profile →
        </a>
      </div>

      <div className="user-stats">
        <div>
          <strong>{user.public_repos}</strong>
          <span>Repositories</span>
        </div>

        <div>
          <strong>{user.followers}</strong>
          <span>Followers</span>
        </div>

        <div>
          <strong>{user.following}</strong>
          <span>Following</span>
        </div>

        <div>
          <strong>{joinDate}</strong>
          <span>Joined</span>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;