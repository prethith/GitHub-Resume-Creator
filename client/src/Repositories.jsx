import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Repositories({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Top Repositories</h1>
      {repos.map((repo) => (
        <div key={repo.id}>
          <h2>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </h2>
          <p>
            <strong>Description:</strong> {repo.description || "N/A"}
          </p>
          <p>
            <strong>Language(s) Used:</strong> {repo.language || "N/A"}
          </p>
          <p>
            <strong>Star Count:</strong> {repo.stargazers_count}
          </p>
          <p>
            <strong>Fork Count:</strong> {repo.forks_count}
          </p>
        </div>
      ))}
    </div>
  );
}

Repositories.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Repositories;
