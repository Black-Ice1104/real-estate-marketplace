// Manage different routes at frontend
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/auth";
import Main from "./components/nav/Main";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from './pages/auth/ForgotPassword';
import AccessAccount from "./pages/auth/AccessAccount";
import Dashboard from "./pages/user/Dashboard";
import AdCreate from "./pages/user/ad/AdCreate";
import PrivateRoute from "./components/routes/PrivateRoute";
import SellHouse from "./pages/user/ad/SellHouse";
import SellLand from "./pages/user/ad/SellLand";
import RentHouse from "./pages/user/ad/RentHouse";
import RentLand from "./pages/user/ad/RentLand";
import AdView from "./pages/AdView";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Main /> {/* import the Main function */}
        <Toaster /> {/* if not so, the toast module in routes won't function */}
        <Routes>
          {/* whenever the user click "Home", will visit "/" page */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/account-activate/:token" element={<AccountActivate />}/>
          <Route path="/auth/forgot-password" element={<ForgotPassword />}/>
          <Route path="/auth/access-account/:token" element={<AccessAccount />}/>
          
          <Route path="/" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />}/>
            <Route path="ad/create" element={<AdCreate />}/>
            <Route path="ad/create/sell/House" element={<SellHouse />} />
            <Route path="ad/create/sell/Land" element={<SellLand />} />
            <Route path="ad/create/rent/House" element={<RentHouse />} />
            <Route path="ad/create/rent/Land" element={<RentLand />} />
          </Route>

          <Route path="/ad/:slug" element={<AdView />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;