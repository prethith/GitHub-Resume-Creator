import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function RecentActivity({ username }) {
  const [commits, setCommits] = useState([]);
  const [pullRequests, setPullRequests] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        // Fetch recent commits
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos`,
          {
            headers: {
              Authorization: `token ${import.meta.env.REACT_APP_GITHUB_TOKEN}`,
            },
          }
        );
        if (!reposResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const repos = await reposResponse.json();
        const repoNames = repos.map((repo) => repo.name);

        const commitsPromises = repoNames.map((repoName) =>
          fetch(
            `https://api.github.com/repos/${username}/${repoName}/commits?per_page=5`
          ).then((response) => response.json())
        );
        const pullRequestsPromises = repoNames.map((repoName) =>
          fetch(
            `https://api.github.com/repos/${username}/${repoName}/pulls?per_page=5`
          ).then((response) => response.json())
        );
        const issuesPromises = repoNames.map((repoName) =>
          fetch(
            `https://api.github.com/repos/${username}/${repoName}/issues?per_page=5`
          ).then((response) => response.json())
        );

        const [commitsData, pullRequestsData, issuesData] = await Promise.all([
          Promise.all(commitsPromises),
          Promise.all(pullRequestsPromises),
          Promise.all(issuesPromises),
        ]);

        setCommits(commitsData.flat());
        setPullRequests(pullRequestsData.flat());
        setIssues(issuesData.flat());
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentActivity();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Recent Activity</h2>
      <div>
        <h3>Recent Commits</h3>
        {commits.length > 0 ? (
          commits.map((commit, index) => (
            <p key={index}>
              <strong>{commit.commit.message}</strong> -{" "}
              <a
                href={commit.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Commit
              </a>
            </p>
          ))
        ) : (
          <p>No recent commits found.</p>
        )}
      </div>
      <div>
        <h3>Recent Pull Requests</h3>
        {pullRequests.length > 0 ? (
          pullRequests.map((pr, index) => (
            <p key={index}>
              <strong>{pr.title}</strong> -{" "}
              <a href={pr.html_url} target="_blank" rel="noopener noreferrer">
                View Pull Request
              </a>
            </p>
          ))
        ) : (
          <p>No recent pull requests found.</p>
        )}
      </div>
      <div>
        <h3>Recent Issues</h3>
        {issues.length > 0 ? (
          issues.map((issue, index) => (
            <p key={index}>
              <strong>{issue.title}</strong> -{" "}
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Issue
              </a>
            </p>
          ))
        ) : (
          <p>No recent issues found.</p>
        )}
      </div>
    </div>
  );
}

RecentActivity.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RecentActivity;