import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import RedirectRoute from "./RedirectRoute";

// or "export default function PrivateRoute(){...}"
const PrivateRoute = () => {
  // context
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (auth?.token) getCurrentUser();
  }, [auth?.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/current-user`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOk(true);
    } catch (err) {
      setOk(false);
    }
  };

  // return ok ? <Outlet /> : "";
  return ok ? <Outlet /> : <RedirectRoute />;
};

export default PrivateRoute;

// axios.interceptors.response.use(
//     (res) => {
//       return res;
//     },
//     async (err) => {
//       const originalConfig = err.config;
   
//       if (err.response) {
//         // token is expired
//         if (err.response.status === 401 && !originalConfig._retry) {
//           originalConfig._retry = true;
   
//           try {
//             const { data } = await axios.get("/refresh-token");
//             axios.defaults.headers.common["token"] = data.token;
//             axios.defaults.headers.common["refresh_token"] = data.refreshToken;
   
//             setAuth(data);
//             localStorage.setItem("auth", JSON.stringify(data));
   
//             return axios(originalConfig);
//           } catch (_error) {
//             if (_error.response && _error.response.data) {
//               return Promise.reject(_error.response.data);
//             }
   
//             return Promise.reject(_error);
//           }
//         }
   
//         if (err.response.status === 403 && err.response.data) {
//           return Promise.reject(err.response.data);
//         }
//       }
   
//       return Promise.reject(err);
//     }
//   );
  