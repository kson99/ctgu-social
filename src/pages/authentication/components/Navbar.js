import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar">
      <Link to="/login">Login</Link>
      <Link to="/signUp">SignUp</Link>
    </div>
  );
}

export default Navbar;
