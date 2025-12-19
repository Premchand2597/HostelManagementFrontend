import { useNavigate } from 'react-router'
import "../Custom_CSS/Style.css"
import useAuth from '../Store/GlobalState';

const TopNav = () => {
  const navigate = useNavigate();

  const isLoggedIn = useAuth((state)=>state.checkLogin);
  const loggedInEmail = useAuth((state)=> state.userEmail);
  const logout = useAuth((state)=>state.logout);

  return (
    <nav className="d-flex justify-content-between align-items-center w-100 px-4 py-2 topNavBar">
      
      <span className="fw-bold fs-5 topNavHeadingBrand">Hostel Management</span>

      <div className="d-flex gap-2 align-items-center">
        {!isLoggedIn() ? (
          <>
            <button className="btn custom-btn" onClick={() => navigate("/")}>
              Home
            </button>
            <button className="btn custom-btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn custom-btn" onClick={() => navigate("/register")}>
              Signup
            </button>
          </>
        ) : (
          <>
            <h1>{loggedInEmail}</h1>
            <button className="btn custom-btn" onClick={() => navigate("/")}>
              Home
            </button>
            <button className="btn custom-btn" onClick={() => {
              logout();
              navigate("/login");
              }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
