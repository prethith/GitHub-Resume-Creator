import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Summary({ username }) {
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        if (!userResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch repositories data
        const repoResponse = await fetch(
          `https://api.github.com/users/${username}/repos`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        if (!repoResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const repos = await repoResponse.json();
        setRepoData(repos);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchData();
    }
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalStars = repoData.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalForks = repoData.reduce((sum, repo) => sum + repo.forks_count, 0);

  return (
    <div>
      <h2 className="Headsub">Summary</h2>
      <p>
        <strong>Bio:</strong> {userData.bio || "N/A"}
      </p>
      <p>
        <strong>Total Contributions:</strong>{" "}
        {userData.public_repos + userData.public_gists}
      </p>
      <p>
        <strong>Total Repositories:</strong> {userData.public_repos}
      </p>
      <p>
        <strong>Total Stars:</strong> {totalStars || "N/A"}
      </p>
      <p>
        <strong>Total Forks:</strong> {totalForks || "N/A"}
      </p>
      <p>
        <strong>Total Followers:</strong> {userData.followers}
      </p>
      <p>
        <strong>Total Following:</strong> {userData.following}
      </p>
    </div>
  );
}

Summary.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Summary;
