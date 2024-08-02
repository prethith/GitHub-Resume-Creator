import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
// import Chart from "chart.js/auto";

function Languages({ username }) {
  const [languagesData, setLanguagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const repos = await response.json();
        const languages = {};
        repos.forEach((repo) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });
        setLanguagesData(languages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchLanguages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const languageNames = Object.keys(languagesData);
  const languageCounts = Object.values(languagesData);
  const totalRepos = languageCounts.reduce((a, b) => a + b, 0);
  const languagePercentages = languageCounts.map(
    (count) => (count / totalRepos) * 100
  );

  const chartData = {
    labels: languageNames,
    datasets: [
      {
        label: "Languages",
        data: languagePercentages,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
        ],
      },
    ],
  };

  return (
    <div>
      <h1>Most Used Languages</h1>
      <Pie data={chartData} />
      <div>
        {languageNames.map((language, index) => (
          <div key={language}>
            <p>
              <strong>Language:</strong> {language}
            </p>
            <p>
              <strong>Percentage of Use:</strong>{" "}
              {languagePercentages[index].toFixed(2)}%
            </p>
            <p>
              <strong>Number of Repositories:</strong> {languageCounts[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

Languages.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Languages;
