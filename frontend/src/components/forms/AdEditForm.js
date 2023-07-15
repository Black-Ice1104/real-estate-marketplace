import CurrencyInput from "react-currency-input-field";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import ImageUpload from "./ImageUpload";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdEditForm({ action, type, ad, setAd }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!ad.photos?.length) {
        toast.error("Photo is required");
        return;
      } else if (!ad.price) {
        toast.error("Price is required");
        return;
      } else if (!ad.description) {
        toast.error("Description is required");
        return;
      } else {
        setAd({ ...ad, loading: true });
        const { data } = await axios.put(`/ad/${ad._id}`, ad);
        console.log("update response => ", data);
        if (data?.error) {
          toast.error(data.error);
          setAd({ ...ad, loading: false });
        } else {
          if (data?.ok) {
            toast.success("Ad updated successfully");
            navigate("/dashboard");
          }
        }
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ImageUpload ad={ad} setAd={setAd} />

        <div className="mb-3 form-control">
          <GooglePlacesAutocomplete
            apiKey={GOOGLE_PLACES_KEY}
            apiOptions={{ region: "au" }}
            selectProps={{
              defaultInputValue: ad?.address,
              placeholder: "Search for address..",
              onChange: ({ value }) => {
                // console.log("address onchange => ", value.description);
                setAd({ ...ad, address: value.description });
              },
            }}
          />
        </div>

        <CurrencyInput
          placeholder="Enter price"
          defaultValue={ad.price}
          className="form-control mb-3"
          onValueChange={(value) => setAd({ ...ad, price: value })}
        />

        {type === "House" ? (
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
              value={ad.bathrooms}
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
        ) : (
          ""
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

        <button disabled={ad.loading} className="btn btn-primary">
          {ad.loading ? "Saving..." : "Submit"}
        </button>
      </form>
      <br />
      {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
    </>
  );
}