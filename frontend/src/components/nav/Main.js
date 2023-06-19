// Manage the layout logic of the main page
// e.g. Home, Login, Register, User Dashboard, etc
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import {useNavigate} from 'react-router-dom';

export default function Main(){
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
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

  return (
    <nav className="nav d-flex justify-content-between p2 lead">
      <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
      <a className="nav-link pointer" onClick={handlePostAdClick}>
        Post Ad
      </a>
      {/* if not logged in, show "login and registered", otherwise show "User" dropdown */}
      {loggedIn ? (
          <div className={`dropdown ${dropdownOpen ? 'show' : ''}`}>
          <a 
            className="nav-link dropdown-toggle" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {auth?.user?.name ? auth.user.name : auth.user.username}
          </a>
          {/* the IF statement can be Logical && Operator in JSX */}
          {dropdownOpen && (
            <ul className="dropdown-menu show">
              <li>
                <NavLink className="nav-link" to={`/dashboard`}>Dashboard</NavLink>
              </li>
              <li>
                <a onClick={logout} className="nav-link pointer">Logout</a>
              </li>
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

// import { useState } from 'react';
// import {NavLink} from "react-router-dom";
// import { useAuth } from "../../context/auth";
// import {useNavigate} from 'react-router-dom';

// export default function Main(){
//     // access context
//     const [auth, setAuth] = useAuth();
//     const navigate = useNavigate();
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const handleDropdownClick = () => {
//       setDropdownOpen(!dropdownOpen);
//     };

//     const logout = () => {
//         setAuth({ user: null, token: "", refreshToken: "" });
//         localStorage.removeItem("auth");
//         navigate('/login');
//       };

//     return (
//         // center display
//         <nav className="nav d-flex justify-content-between p2 lead">
//         {/* with NavLink, the user doesn't have to refresh the page to get to another page */}
//             <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
//             <NavLink className="nav-link" to="/login">Login</NavLink>
//             <NavLink className="nav-link" to="/register">Register</NavLink>
        
//             <div className="dropdown show">
//                 <li>
//                     <a className="nav-link dropdown-toggle">User</a>
//                     <ul className="dropdown-menu">
//                         <li>
//                             <NavLink className="nav-link" to={`/dashboard`}>Dashboard</NavLink>
//                         </li>
//                         <li>
//                             <a onClick={logout} className="nav-link pointer">Logout</a>
//                         </li>
//                     </ul>
//                 </li>
//             </div>
//         </nav>
        
//     );
// }