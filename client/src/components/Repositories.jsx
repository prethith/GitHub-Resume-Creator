import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function Repositories({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRepoIds, setExpandedRepoIds] = useState({});

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
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

        // Sort repos by star count in descending order
        const sortedRepos = data.sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );
        setRepos(sortedRepos);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchRepos();
    }
  }, [username]);

  const toggleExpand = (id) => {
    setExpandedRepoIds((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (repos.length === 0) {
    return <div>No repositories found.</div>;
  }

  return (
    <div>
      <h1 className="Headsub">Top Repositories</h1>
      {repos.map((repo) => (
        <div key={repo.id} style={{ marginBottom: "1em" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h4>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${repo.name} on GitHub`}
              >
                {repo.name}
              </a>
              <FontAwesomeIcon
                icon={expandedRepoIds[repo.id] ? faChevronUp : faChevronDown}
                onClick={() => toggleExpand(repo.id)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
                aria-label={`Toggle details for ${repo.name}`}
              />
            </h4>
          </div>
          {expandedRepoIds[repo.id] && (
            <div>
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
          )}
        </div>
      ))}
    </div>
  );
}

Repositories.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Repositories;
