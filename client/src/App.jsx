import { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import Summary from "./Summary";
import RecentActivity from "./RecentActivity";
import Repositories from "./Repositories";
import RecentContributions from "./RecentContributions";
import Organizations from "./Organizations";

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
        <input
          value={username}
          onChange={handleChange}
          placeholder="Enter Github Username"
        />
        <button type="submit">Enter</button>
      </form>
      {submitted && <PersonalInformation username={username} />}
      {submitted && <Summary username={username} />}
      {submitted && <RecentContributions username={username} />}
      {submitted && <Organizations username={username} />}
    </>
  );
}

export default App;
