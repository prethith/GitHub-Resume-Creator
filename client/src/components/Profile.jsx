import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PersonalInformation from "./PersonalInformation";
import Repositories from "./Repositories";
import RecentContributions from "./RecentContributions";
import Languages from "./Languages";
import Organizations from "./Organizations";
import ProfileNavigation from "./ProfileNavigation";
import { generateCombinedPDF } from "./GenerateCombinedPDF";

const steps = [
  PersonalInformation,
  Repositories,
  RecentContributions,
  Languages,
  Organizations,
];

function Profile() {
  const { username } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [pullRequests, setPullRequests] = useState([]);
  const [issues, setIssues] = useState([]);
  const [languages, setLanguages] = useState({});
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      const userData = await userResponse.json();
      setUserData(userData);

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      const reposData = await reposResponse.json();
      setRepos(reposData);

      const commitsResponse = await fetch(
        `https://api.github.com/search/commits?q=author:${username}&sort=author-date&order=desc&per_page=5`,
        {
          headers: {
            Accept: "application/vnd.github.cloak-preview",
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      const commitsData = await commitsResponse.json();
      setCommits(commitsData.items);

      const pullRequestsResponse = await fetch(
        `https://api.github.com/search/issues?q=author:${username}+type:pr&sort=created&order=desc&per_page=5`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      const pullRequestsData = await pullRequestsResponse.json();
      setPullRequests(pullRequestsData.items);

      const issuesResponse = await fetch(
        `https://api.github.com/search/issues?q=author:${username}+type:issue&sort=created&order=desc&per_page=5`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      const issuesData = await issuesResponse.json();
      setIssues(issuesData.items);

      const languagesResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      const languagesData = await languagesResponse.json();
      const languageCount = languagesData.reduce((acc, repo) => {
        if (repo.language) {
          acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
      }, {});
      setLanguages(languageCount);

      const organizationsResponse = await fetch(
        `https://api.github.com/users/${username}/orgs`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      const organizationsData = await organizationsResponse.json();
      setOrganizations(organizationsData);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const CurrentComponent = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <ProfileNavigation
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <CurrentComponent username={username} />
      <div className="navigation-buttons">
        {currentStep > 0 && <button onClick={handlePrevious}>Previous</button>}
        {currentStep < steps.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
      <button
        onClick={() =>
          generateCombinedPDF(
            userData,
            repos,
            commits,
            pullRequests,
            issues,
            languages,
            organizations
          )
        }
      >
        Download All Data as PDF
      </button>
    </div>
  );
}

export default Profile;
