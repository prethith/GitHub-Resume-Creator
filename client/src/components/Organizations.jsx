import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Organizations({ username }) {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const token = localStorage.getItem('github_token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/orgs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrganizations(response.data);
      } catch (error) {
        setError('Failed to fetch organizations');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchOrganizations();
    }
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="Headsub">Organizations</h1>
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
