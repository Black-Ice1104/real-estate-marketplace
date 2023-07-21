// pages/AdsForRent.js
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm.js";


export default function AdsForRent() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads-for-rent");
      setAds(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <SearchForm />
      <h2 className="display-1 bg-primary text-light p-5 h1">For Rent</h2>
      <div className="container">
        <div className="row">
          {ads?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
    </div>
  );
}