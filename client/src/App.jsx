import { useState } from "react";
import PersonalInformation from "./components/PersonalInformation";
import Summary from "./components/Summary";
import RecentActivity from "./components/RecentActivity";
import Repositories from "./components/Repositories";
import RecentContributions from "./components/RecentContributions";
import Organizations from "./components/Organizations";
import Languages from "./components/Languages";
import Projects from "./components/Projects";
import OpenSourceProjects from "./components/OpenSourceProjects";

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
