// Manage the layout logic of the main page
// e.g. Home, Login, Register, User Dashboard, etc
import { useState, useEffect, useRef  } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import {useNavigate} from 'react-router-dom';

export default function Main(){
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // if logged in, there must exist user, token and refresh token
  const loggedIn = auth?.user !== null && auth?.token !== "" && auth?.refreshToken !== "";
  
  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate('/login');
  };

  const handlePostAdClick = () => {
    if(loggedIn){
      navigate("/ad/create");
    }else{
      navigate("/login");
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  return (
    <nav className="nav d-flex justify-content-between p2 lead">
      <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
      <NavLink className="nav-link" to="/search">Search</NavLink>
      <NavLink className="nav-link" to="/buy">Buy</NavLink>
      <NavLink className="nav-link" to="/rent">Rent</NavLink>
      <NavLink className="nav-link" to="/agents">Agents</NavLink>
      <a className="nav-link pointer" onClick={handlePostAdClick}>Post Ad</a>
      {/* if not logged in, show "login and registered", otherwise show "User" dropdown */}
      {loggedIn ? (
          <div className={`dropdown ${dropdownOpen ? 'show' : ''}`} ref={dropdownRef}>
          <a 
            className="nav-link dropdown-toggle" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {auth?.user?.name ? auth.user.name : auth.user.username}
          </a>

          {dropdownOpen && (
            <ul className="dropdown-menu show">
                <NavLink className="nav-link" to={`/dashboard`}>Dashboard</NavLink>
                <a onClick={logout} className="nav-link pointer">Logout</a>
            </ul>
          )}
          </div>
        ) : (
          <>
              <NavLink className="nav-link" to="/login">Login</NavLink>
              <NavLink className="nav-link" to="/register">Register</NavLink>
          </>
        )
      }
    </nav>
  );
}