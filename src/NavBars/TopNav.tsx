import { useNavigate } from 'react-router'
import "../Custom_CSS/Style.css"

const TopNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="d-flex justify-content-between align-items-center w-100 px-4 py-2 topNavBar">
      
      <span className="fw-bold fs-5 topNavHeadingBrand">Hostel Management</span>

      <div className="d-flex gap-2 align-items-center">
        <button className="btn custom-btn" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="btn custom-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn custom-btn" onClick={() => navigate("/register")}>
          Signup
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
