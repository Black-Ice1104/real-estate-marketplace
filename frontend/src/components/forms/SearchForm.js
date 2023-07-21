import { useSearch } from "../../context/search";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import { sellPrices, rentPrices } from "../../helpers/priceList";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import queryString from "query-string";
import { useNavigate } from 'react-router-dom';

export default function SearchForm() {
  // context
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useSearch();
  const dropdownRef = useRef(null);

    // hooks
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

    const handleSearch = async (e) => {
      setSearch({ ...search, loading: true });
      try {
        const { results, page, price, ...rest } = search;
        const query = queryString.stringify(rest);
        const { data } = await axios.get(`/search?${query}`);

        if (search?.page !== "/search") {
          setSearch((prev) => ({
            ...prev,
            results: data,
            loading: false,
          }));
          navigate("/search");
        } else {
          setSearch((prev) => ({
            ...prev,
            results: data,
            page: window.location.pathname,
            loading: false,
          }));
        }
        // console.log(query)
      } catch (err) {
        console.log(err);
        setSearch({ ...search, loading: false });
      }
    };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-12">
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_PLACES_KEY}
              apiOptions={{ region: "au" }}
              selectProps={{
                defaultInputValue: search?.address,
                placeholder: "Search for address..",
                onChange: ({ value }) => {
                  setSearch({ ...search, address: value.description });
                },
              }}
            />
          </div>
        </div>

          <div className="d-flex justify-content-center mt-3">
            <button
              onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
              className="col-lg-2 btn btn-primary"
            >
              {search.action === "Buy" ? "✅ Buy" : "Buy"}
            </button>
            <button
              onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
              className="col-lg-2 btn btn-primary"
            >
              {search.action === "Rent" ? "✅ Rent" : "Rent"}
            </button>
            <button
              onClick={() => setSearch({ ...search, type: "House" })}
              className="col-lg-2 btn btn-primary"
            >
              {search.type === "House" ? "✅ House" : "House"}
            </button>
            <button
              onClick={() => setSearch({ ...search, type: "Land" })}
              className="col-lg-2 btn btn-primary"
            >
              {search.type === "Land" ? "✅ Land" : "Land"}
            </button>

            
            <div className={`dropdown ${isOpen ? 'show' : ''}`} ref={dropdownRef}>
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* &nbsp; Price range */}
                  &nbsp; {search.price ? search.price : "Price"}
                </button>
                
                <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                  {search.action === "Buy" ? (
                    <>
                      {sellPrices?.map((p) => (
                        <li key={p._id}>
                          <a
                            className="dropdown-item"
                            onClick={() => 
                              setSearch({
                                ...search,
                                price: p.name,
                                priceRange: p.array,
                              })
                            }
                          >
                            {p.name}
                          </a>
                        </li>
                      ))}
                    </>
                  ) : (
                    <>
                      {rentPrices?.map((p) => (
                        <li key={p._id}>
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              setSearch({
                                ...search,
                                price: p.name,
                                priceRange: p.array,
                              })
                            }
                          >
                            {p.name}
                          </a>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
            </div>

            <button
              disabled={search.loading}
              onClick={handleSearch}
              className="col-lg-2 btn btn-danger"
            >
              {search.loading ? "Please wait" : "Search"}
            </button>
        </div>
      </div>

      {/* <pre>{JSON.stringify(search, null, 4)}</pre> */}
    </>
  );
}