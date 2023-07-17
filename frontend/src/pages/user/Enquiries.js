import { useEffect, useState } from "react";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import AdCard from "../../components/cards/AdCard";
import { useAuth } from "../../context/auth";

export default function Enquiries() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) fetchEnquiredProperties();
  }, [auth?.token]);

  const fetchEnquiredProperties = async () => {
    try {
      const { data } = await axios.get(`/enquired-properties`);
      console.log(data);
      setAds(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
        <>
          <h1 className="display-1 bg-primary text-light p-5">Enquiries</h1>
          <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ marginTop: "-7%" }}
          >
            <div className="display-1">Loading...</div>
          </div>
        </>
    );
  }

  return (
    <>
        <h1 className="display-1 bg-primary text-light p-5">Enquiries</h1>
        <div className="contaienr-fluid">
          <Sidebar />
          <div className="container mt-2 text-center">
            <h1>{ads.length} enquired properties</h1>
          </div>

          <div className="container">
            <div className="row">
              {ads?.map((ad) => (
                <>
                  <AdCard ad={ad} />
                </>
              ))}
            </div>
          </div>
        </div>
    </>
  );
}