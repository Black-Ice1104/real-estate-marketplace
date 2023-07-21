// Manage the layout of Home page
import {useAuth} from "../context/auth.js";
import { useState, useEffect } from "react";
import axios from "axios";
import AdCard from "../components/cards/AdCard.js";
import SearchForm from "../components/forms/SearchForm.js";

export default function Home() {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [adsForSell, setAdsForSell] = useState([]);
    const [adsForRent, setAdsForRent] = useState([]);
  
    useEffect(() => {
      fetchAds();
    }, []);
  
    const fetchAds = async () => {
      try {
        const { data } = await axios.get("/ads");
        console.log(data);
        setAdsForSell(data.adsForSell);
        setAdsForRent(data.adsForRent);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div>
        <SearchForm />
        <h2 className="display-1 bg-primary text-light p-5 h1">For Sell</h2>
        <div className="container">
          <div className="row">
            {adsForSell?.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))}
          </div>
        </div>

        <h2 className="display-1 bg-primary text-light p-5 h1 mt-2">For Rent</h2>
        <div className="container">
          <div className="row">
            {adsForRent?.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }