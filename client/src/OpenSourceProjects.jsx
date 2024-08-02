import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function OpenSourceProjects({ username }) {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setContributions(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Contributions to Open Source Projects</h1>
      {contributions.length === 0 ? (
        <p>No contributions found.</p>
      ) : (
        contributions.map((contribution) => (
          <div key={contribution.id}>
            <p>
              <strong>Project Name:</strong>{" "}
              <a
                href={contribution.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contribution.name}
              </a>
            </p>
            <p>
              <strong>Description:</strong> {contribution.description || "No description available"}
            </p>
            <p>
              <strong>Contribution:</strong> {contribution.default_branch}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

OpenSourceProjects.propTypes = {
  username: PropTypes.string.isRequired,
};

export default OpenSourceProjects;
