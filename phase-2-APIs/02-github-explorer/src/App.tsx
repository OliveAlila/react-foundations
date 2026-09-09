import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";
import RepositoryList from "./components/RepositoryList";
import type {
  GitHubUser,
  GitHubRepository,
} from "./types/github";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");

  const [user, setUser] = useState<GitHubUser | null>(null);

  const [repositories, setRepositories] = useState<
    GitHubRepository[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const searchGitHub = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(
          username.trim()
        )}`
      );

      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error("GitHub user not found.");
        }

        throw new Error(
          "Unable to fetch GitHub user. Please try again."
        );
      }

      const userData: GitHubUser =
        await userResponse.json();

      const repositoryResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(
          username.trim()
        )}/repos?sort=updated&per_page=10`
      );

      if (!repositoryResponse.ok) {
        throw new Error(
          "Unable to fetch the user's repositories."
        );
      }

      const repositoryData: GitHubRepository[] =
        await repositoryResponse.json();

      setUser(userData);
      setRepositories(repositoryData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }

      setUser(null);
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <div className="github-container">
        <header className="page-header">
          <h1>GitHub Explorer</h1>

          <p>
            Search for a GitHub user and explore their profile
            and repositories.
          </p>
        </header>

        <SearchBar
          username={username}
          onUsernameChange={setUsername}
          onSearch={searchGitHub}
          loading={loading}
        />

        {error && <p className="error">{error}</p>}

        {loading && (
          <div className="loading">
            <p>Searching GitHub...</p>
          </div>
        )}

        {user && !loading && (
          <>
            <UserProfile user={user} />

            <RepositoryList
              repositories={repositories}
            />
          </>
        )}

        {!user && !loading && !error && (
          <div className="empty-state">
            <p>🔎 Search for a GitHub username to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;