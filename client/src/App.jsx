import { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import Summary from "./Summary";
import RecentActivity from "./RecentActivity";
import Repositories from "./Repositories";
import RecentContributions from "./RecentContributions";
import Organizations from "./Organizations";
import Languages from "./Languages";
import Projects from "./Projects";
import OpenSourceProjects from "./OpenSourceProjects";

function App() {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // console.log(username);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    // This is a placeholder function for now
    e.preventDefault();
    console.log("Form submitted, username: ", username);
    setSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {submitted && <PersonalInformation username={username} />}
        {submitted && <Repositories username={username} />}
        {submitted && <RecentContributions username={username} />}
        {/* {submitted && <Languages username={username} />} */}
        {/* {submitted && <Organizations username={username} />} */}
        {submitted && <OpenSourceProjects username={username} />}
        {submitted && <Projects username={username} />}
        <div className="center-container">
          <div className="form-group">
            <input
              placeholder="Enter Github Username"
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
