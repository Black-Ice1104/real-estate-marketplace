import CurrencyInput from "react-currency-input-field";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import ImageUpload from "./ImageUpload";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdEditForm({ action, type, ad, setAd}) {
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

  const handleDelete = async (e) => {
    e.preventDefault(); // avoid default action from happening (auto submit when clicked anyways if inside the form)
    const answer = window.confirm("Delete the ad?");
    if (!answer) return;
    try {
      const { data } = await axios.delete(`/ad/${ad._id}`);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Ad deleted");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete ad. Try again.");
    }
  };

  return (
    <>
      <form className="col-lg-8 offset-lg-2 mt-3">
        <ImageUpload ad={ad} setAd={setAd} />

        <div>Enter Address:</div>
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

        <div className="d-flex align-items-center justify-content-between">
            Enter price:
                <CurrencyInput
                  placeholder="Enter price"
                  defaultValue={ad.price}
                  className="form-control"
                  style={{width: '750px'}}
                  onValueChange={(value) => setAd({ ...ad, price: value })}
                />
        </div>

        {type === "House" ? (
          <>
            <div className="d-flex align-items-center justify-content-between">
                Enter how many bedrooms:
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  style={{width: '750px'}}
                  value={ad.bedrooms}
                  onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
                  required
                />
            </div>
            
            <div className="d-flex align-items-center justify-content-between">
                Enter how many bathrooms:
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  style={{width: '750px'}}
                  placeholder="Enter how many bathrooms"
                  value={ad.bathrooms}
                  onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
                  required
                />
            </div>

            <div className="d-flex align-items-center justify-content-between">
                Enter how many car parks:
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  style={{width: '750px'}}
                  placeholder="Enter how many car parks"
                  value={ad.carpark}
                  onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
                />
            </div>
          </>
        ) : (
          ""
        )}

        <div className="d-flex align-items-center justify-content-between">
            Size of land:
            <input
              type="text"
              className="form-control"
              style={{width: '750px'}}
              placeholder="Size of land"
              value={ad.landsize}
              onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
            />
        </div>

        <div className="d-flex align-items-center justify-content-between">
            Enter title:
            <input
              type="text"
              className="form-control"
              style={{width: '750px'}}
              placeholder="Enter title"
              value={ad.title}
              onChange={(e) => setAd({ ...ad, title: e.target.value })}
              required
            />
        </div>

        <div className="mt-3">Write Description:</div>
        <textarea
          className="form-control mb-3"
          value={ad.description}
          placeholder="Write description"
          onChange={(e) => setAd({ ...ad, description: e.target.value })}
        />

        <div className="d-flex justify-content-between">
          <button
            onClick={handleSubmit}
            disabled={ad.loading}
            className="btn btn-primary"
          >
            {ad.loading ? "Saving..." : "Submit"}
          </button>
          <button
            onClick={handleDelete}
            disabled={ad.loading}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </form>
      <br />
      {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
    </>
  );
}