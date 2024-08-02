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
        
      {submitted && <PersonalInformation username={username} />}
      {submitted && <Summary username={username} />}
    <div class="center-container">
      <div class="form-group">
      <input placeholder="Enter Github Username"/>
      <button type="submit">Submit</button>
      </div>
    </div>
      </form>
    </>
  );
}

export default App;
