// Fill in AD form
import React, { useState } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { GOOGLE_PLACES_KEY } from "../../config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
// import { Avatar } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdForm({ action, type }) {
    // state
    const [ad, setAd] = useState({
      photos: [],
      uploading: false,
      price: "",
      address: "",
      bedrooms: "",
      bathrooms: "",
      carpark: "",
      landsize: "",
      title: "",
      description: "",
      loading: false,
      type,
      action,
    });

    // hooks
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setAd({ ...ad, loading: true });
        const { data } = await axios.post("/ad", ad);
        if (data?.error) {
          toast.error(data.error);
          setAd({ ...ad, loading: false });
        } else {
          // console.log("ad create response => ", data);
          toast.success("Ad created successfully");
          setAd({ ...ad, loading: false });
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
        setAd({ ...ad, loading: false });
      }
    };

    return (
      <>
        {/* magin bottom */}
        <div className="mb-3 form-control"> 
            <ImageUpload ad={ad} setAd={setAd}/>
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_PLACES_KEY}
              apiOptions={{ region: 'us' }}
              selectProps={{
                defaultInputValue: ad?.address,
                placeholder: "Search for address..",
                onChange: ({value}) => {
                    setAd({ ...ad, address: value?.description });
                },
              }}
            />
        </div>
        {/* <form onSubmit={handleSubmit}> */}
        <div style={{marginTop: "120px"}}>
          <CurrencyInput
            placeholder="Enter price"
            defaultValue={ad.price}
            className="form-control mb-3"
            onValueChange={(value) => setAd({ ...ad, price: value })}
          />
        </div>
        {/* </form> */}

        {type === "House" && (
          <>
            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="Enter how many bedrooms"
              value={ad.bedrooms}
              onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
              required
            />

            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="Enter how many bathrooms"
              value={ad.toilets}
              onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
              required
            />

            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="Enter how many car parks"
              value={ad.carpark}
              onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
            />
          </>
        )}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Size of land"
          value={ad.landsize}
          onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter title"
          value={ad.title}
          onChange={(e) => setAd({ ...ad, title: e.target.value })}
          required
        />

        <textarea
          className="form-control mb-3"
          value={ad.description}
          placeholder="Write description"
          onChange={(e) => setAd({ ...ad, description: e.target.value })}
        />

        <button 
          onClick={handleSubmit} 
          disabled={ad.loading} className="btn btn-primary"
        >
          {ad.loading ? "Saving..." : "Submit"}
        </button>

        <p></p>
        <pre>
          {JSON.stringify(ad, null, 4)}
        </pre>
      </>
    );
  }