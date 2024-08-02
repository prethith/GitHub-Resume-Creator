import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Organizations({ username }) {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/orgs`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrganizations();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Organizations</h1>
      {organizations.length === 0 ? (
        <p>No organizations found.</p>
      ) : (
        organizations.map((org) => (
          <div key={org.id}>
            <p>
              <strong>Organization Name:</strong>{" "}
              <a href={org.html_url} target="_blank" rel="noopener noreferrer">
                {org.login}
              </a>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

Organizations.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Organizations;
