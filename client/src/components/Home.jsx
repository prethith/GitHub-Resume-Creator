import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/profile/${username}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="center-container">
        <div className="form-group">
          <input
            placeholder="Enter Github Username"
            onChange={handleChange}
            value={username}
          />
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default Home;
