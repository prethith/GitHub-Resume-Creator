import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function RecentContributions({ username }) {
  const [commits, setCommits] = useState([]);
  const [pullRequests, setPullRequests] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecentContributions() {
      try {
        // Fetch recent commits
        const commitsResponse = await fetch(
          `https://api.github.com/search/commits?q=author:${username}&sort=author-date&order=desc&per_page=5`,
          {
            headers: {
              Accept: "application/vnd.github.cloak-preview", // Required for the search commits API
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        if (!commitsResponse.ok) {
          throw new Error(
            `Error: ${commitsResponse.status} ${commitsResponse.statusText}`
          );
        }
        const commitsData = await commitsResponse.json();
        setCommits(commitsData.items);

        // Fetch recent pull requests
        const pullRequestsResponse = await fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:pr&sort=created&order=desc&per_page=5`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        if (!pullRequestsResponse.ok) {
          throw new Error(
            `Error: ${pullRequestsResponse.status} ${pullRequestsResponse.statusText}`
          );
        }
        const pullRequestsData = await pullRequestsResponse.json();
        setPullRequests(pullRequestsData.items);

        // Fetch recent issues
        const issuesResponse = await fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:issue&sort=created&order=desc&per_page=5`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        if (!issuesResponse.ok) {
          throw new Error(
            `Error: ${issuesResponse.status} ${issuesResponse.statusText}`
          );
        }
        const issuesData = await issuesResponse.json();
        setIssues(issuesData.items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchRecentContributions();
    }
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="Headsub">Recent Contributions</h1>
      <h2 className="sub">Recent Commits</h2>
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
      <h2 className="sub">Recent Pull Requests</h2>
      {pullRequests.length === 0 ? (
        <p>No recent pull requests found.</p>
      ) : (
        pullRequests.map((pr) => (
          <div key={pr.id}>
            <p>
              {pr.title} -{" "}
              <a href={pr.html_url} target="_blank" rel="noopener noreferrer">
                View Pull Request
              </a>
            </p>
          </div>
        ))
      )}
      <h2 className="sub">Recent Issues</h2>
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
  );
}

RecentContributions.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RecentContributions;
