import type { GitHubRepository } from "../types/github";
import RepositoryCard from "./RepositoryCard";

interface RepositoryListProps {
  repositories: GitHubRepository[];
}

function RepositoryList({
  repositories,
}: RepositoryListProps) {
  if (repositories.length === 0) {
    return (
      <p className="empty-repositories">
        This user has no public repositories.
      </p>
    );
  }

  return (
    <section className="repositories">
      <h2>Repositories</h2>

      <div className="repository-grid">
        {repositories.map((repository) => (
          <RepositoryCard
            key={repository.id}
            repository={repository}
          />
        ))}
      </div>
    </section>
  );
}

export default RepositoryList;