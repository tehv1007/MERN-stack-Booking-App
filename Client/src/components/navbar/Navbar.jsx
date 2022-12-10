import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <div className="navbar__">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking Website</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span>{user.username}</span>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="navButton" onClick={handleLogout}>
                Logout
              </button>
            </Link>
            <Link
              to="/transactions"
              style={{ color: "inherit", textDecoration: "none" }}>
              <button className="navButton">Transaction</button>
            </Link>
          </div>
        ) : (
          <div className="navItems">
            <Link
              to="/register"
              style={{ color: "inherit", textDecoration: "none" }}>
              <button className="navButton">Register</button>
            </Link>
            <Link
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
