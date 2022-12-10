import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", inputs);
      alert("Account has been created successfully!");
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
      console.log(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="lContainer">
        <input
          type="text"
          name="username"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          name="fullName"
          placeholder="Fullname"
          id="fullName"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          id="phoneNumber"
          onChange={handleChange}
          className="lInput"
        />
        {/* <div>{showErr(err)}</div> */}
        {err && <span>{err.message}</span>}
        <button onClick={handleClick} className="lButton">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
