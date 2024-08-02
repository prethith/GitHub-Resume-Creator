import { useState } from "react";
import PersonalInformation from "./PersonalInformation";

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
          placeholder="Enter the github username"
        />
        <button type="submit">Enter</button>
      </form>
      {submitted && <PersonalInformation username={username} />}
    </>
  );
}

export default App;
