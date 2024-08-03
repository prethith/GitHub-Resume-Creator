import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

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
    <>
      <header>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div>
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
      </div>
    </>
  );
}

export default Home;
