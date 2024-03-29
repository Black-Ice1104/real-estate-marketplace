import SearchForm from "../components/forms/SearchForm";
import { useSearch } from "../context/search";
import AdCard from "../components/cards/AdCard";

export default function Search() {
  // context
  const [search, setSearch] = useSearch();

  return (
    <>
      <h2 className="display-1 bg-primary text-light p-5 h1">Search</h2>
      <div className="pt-4">
        <SearchForm />
      </div>

      <div className="container">
        <div className="row gx-2">
          {search.results?.length > 0 ? (
            <div className="col-md-12 text-center p-5">
              Found {search.results?.length} results
            </div>
          ) : (
            <div className="col-md-12 text-center p-5">No properties found</div>
          )}
          {search.results?.map((item) => (
            <AdCard ad={item} />
          ))}
        </div>
      </div>
    </>
  );
}