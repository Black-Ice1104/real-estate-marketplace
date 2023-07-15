// 
import Sidebar from "../../../components/nav/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdCreate() {
  // state change if clicked
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);
  // hooks
  const navigate = useNavigate();
  const handleSell = () => {
    setSell(true);
    setRent(false);
  };
  const handleRent = () => {
    setSell(false);
    setRent(true);
  };

  return (
    <>
      <h1 className="display-1 bg-primary text-light p-5">Ad Create</h1>
      <div className="container-fluid">
        <Sidebar />
        <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ marginTop: "-14%" }}
        >
          <div className="col-lg-6">
            <button onClick={handleSell} className="btn btn -primary p-5 col-12 h2" >
              <span className="h2">Sell</span>
            </button>
            {/* on Sell click show options */}
            {sell && (
              <div className="my-1">
                <button
                  onClick={() => navigate(`/ad/create/sell/House`)}
                  className="btn btn-secondary p-5 col-6"
                >
                  House
                </button>
                <button
                  onClick={() => navigate(`/ad/create/sell/Land`)}
                  className="btn btn-secondary p-5 col-6"
                >
                  Land
                </button>
              </div>
            )}
          </div>

          <div className="col-lg-6">
            <button onClick={handleRent} className="btn btn -primary p-5 col-12">
              <span className="h2">Rent</span>
            </button>
            {/* on Rent click show options */}
            {rent && (
              <div className="my-1">
                <button
                  onClick={() => navigate(`/ad/create/rent/House`)}
                  className="btn btn-secondary p-5 col-6"
                >
                  House
                </button>
                <button
                  onClick={() => navigate(`/ad/create/rent/Land`)}
                  className="btn btn-secondary p-5 col-6"
                >
                  Land
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}