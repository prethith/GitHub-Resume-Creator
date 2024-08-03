import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Repositories({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRepoIds, setExpandedRepoIds] = useState({});

  useEffect(() => {
    const fetchRepos = async () => {
      const token = localStorage.getItem('github_token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        const localStorageKey = `repos_${username}`;
        const cachedRepos = localStorage.getItem(localStorageKey);

        if (cachedRepos) {
          setRepos(JSON.parse(cachedRepos));
        } else {
          const response = await axios.get(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const sortedRepos = response.data.sort(
            (a, b) => b.stargazers_count - a.stargazers_count
          );
          setRepos(sortedRepos);
          localStorage.setItem(localStorageKey, JSON.stringify(sortedRepos));
        }
      } catch (error) {
        setError('Repositories not found');
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

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
    return <div>Error: {error}</div>;
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
