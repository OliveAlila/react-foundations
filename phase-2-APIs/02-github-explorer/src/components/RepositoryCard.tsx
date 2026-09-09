import type { GitHubRepository } from "../types/github";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

function RepositoryCard({ repository }: RepositoryCardProps) {
  const updatedDate = new Date(
    repository.updated_at
  ).toLocaleDateString();

  return (
    <article className="repository-card">
      <div className="repository-header">
        <h3>{repository.name}</h3>

        {repository.language && (
          <span className="language">
            {repository.language}
          </span>
        )}
      </div>

      <p className="repository-description">
        {repository.description ||
          "No description provided."}
      </p>

      <div className="repository-stats">
        <span>⭐ {repository.stargazers_count}</span>

        <span>🍴 {repository.forks_count}</span>

        <span>Updated {updatedDate}</span>
      </div>

      <a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="repository-link"
      >
        View Repository →
      </a>
    </article>
  );
}

export default RepositoryCard;