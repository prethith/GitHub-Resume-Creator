import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Projects({ username }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="Headsub">Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id}>
            <p>
              <strong>Project Name:</strong>{" "}
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.name}
              </a>
            </p>
            <p>
              <strong>Description:</strong> {project.description || "No description available"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

Projects.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Projects;
