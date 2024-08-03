import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

function RecentContributions({ username }) {
  const [commits, setCommits] = useState([]);
  const [pullRequests, setPullRequests] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommits, setShowCommits] = useState(false);
  const [showPullRequests, setShowPullRequests] = useState(false);
  const [showIssues, setShowIssues] = useState(false);

  useEffect(() => {
    const fetchRecentContributions = async () => {
      const token = localStorage.getItem('github_token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        // Fetch recent commits
        const commitsResponse = await axios.get(
          `https://api.github.com/search/commits?q=author:${username}&sort=author-date&order=desc&per_page=5`,
          {
            headers: {
              Accept: "application/vnd.github.cloak-preview", // Required for the search commits API
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCommits(commitsResponse.data.items);

        // Fetch recent pull requests
        const pullRequestsResponse = await axios.get(
          `https://api.github.com/search/issues?q=author:${username}+type:pr&sort=created&order=desc&per_page=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPullRequests(pullRequestsResponse.data.items);

        // Fetch recent issues
        const issuesResponse = await axios.get(
          `https://api.github.com/search/issues?q=author:${username}+type:issue&sort=created&order=desc&per_page=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIssues(issuesResponse.data.items);
      } catch (error) {
        // Check if the error response has a message or fallback to a generic message
        setError(error.response?.data?.message || 'Failed to fetch contributions');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRecentContributions();
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
      <h1 className="Headsub">Recent Contributions</h1>

      <div>
        <button
          onClick={() => setShowCommits(!showCommits)}
          className="toggle-button"
        >
          Recent Commits {showCommits ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showCommits && (
          <div>
            {commits.length === 0 ? (
              <p>No recent commits found.</p>
            ) : (
              commits.map((commit) => (
                <div key={commit.sha}>
                  <p>
                    {commit.commit.message} -{" "}
                    {new Date(commit.commit.author.date).toLocaleDateString()} -{" "}
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Commit
                    </a>
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setShowPullRequests(!showPullRequests)}
          className="toggle-button"
        >
          Recent Pull Requests{" "}
          {showPullRequests ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showPullRequests && (
          <div>
            {pullRequests.length === 0 ? (
              <p>No recent pull requests found.</p>
            ) : (
              pullRequests.map((pr) => (
                <div key={pr.id}>
                  <p>
                    {pr.title} -{" "}
                    <a
                      href={pr.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Pull Request
                    </a>
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setShowIssues(!showIssues)}
          className="toggle-button"
        >
          Recent Issues {showIssues ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showIssues && (
          <div>
            {issues.length === 0 ? (
              <p>No recent issues found.</p>
            ) : (
              issues.map((issue) => (
                <div key={issue.id}>
                  <p>
                    {issue.title} -{" "}
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Issue
                    </a>
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

RecentContributions.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RecentContributions;
