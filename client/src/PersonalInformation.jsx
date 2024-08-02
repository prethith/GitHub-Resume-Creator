import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function UserProfile({ username }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {userData && (
        <div>
          <div>
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              width="100"
            />
            <p>
              <strong>Username:</strong> {userData.login}
            </p>
            <p>
              <strong>Full Name:</strong> {userData.name || "N/A"}
            </p>
            <p>
              <strong>Bio:</strong> {userData.bio || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {userData.location || "N/A"}
            </p>
            <p>
              <strong>Company:</strong> {userData.company || "N/A"}
            </p>
            <p>
              <strong>Blog:</strong>{" "}
              {userData.blog ? (
                <a
                  href={userData.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.blog}
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>
          <div>
            <h2>Summary</h2>
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
              <strong>Total Stars:</strong>{" "}
              {userData.public_repos ? userData.public_repos * 5 : "N/A"}{" "}
              {/* Replace with actual stars calculation if available */}
            </p>
            <p>
              <strong>Total Forks:</strong>{" "}
              {userData.public_repos ? userData.public_repos * 3 : "N/A"}{" "}
              {/* Replace with actual forks calculation if available */}
            </p>
            <p>
              <strong>Total Followers:</strong> {userData.followers}
            </p>
            <p>
              <strong>Total Following:</strong> {userData.following}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserProfile;
