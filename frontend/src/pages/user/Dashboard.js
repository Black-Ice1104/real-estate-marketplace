import { useEffect, useState } from "react";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import UserAdCard from "../../components/cards/UserAdCard";

export default function Dashboard() {
  // state
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    if (page === 1) return;

    const loadMore = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/user-ads/${page}`);
        setAds([...ads, ...data.ads]);
        setTotal(data.total);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadMore(); // execute
  }, [page]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/user-ads/${page}`);
      setAds(data.ads);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="display-1 bg-primary text-light p-5">User Dashboard</h1>
      <div className="contaienr-fluid">
        <Sidebar />
        <div className="container mt-2 text-center">
          <h2>
            {total > 0 ? `You have ${total} ads` : "You have not posted any ads"}
          </h2>
        </div>

        <div className="container">
          <div className="row">
            {ads?.map((ad) => (
              <UserAdCard ad={ad} key={ad._id}/>
            ))}
          </div>
        </div>
      </div>

      {/* show load more button */}
      <div className="container mt-3 mb-3">
        {ads && ads.length < total && (
          <div className="text-center mt-4 mb-4">
            <button
              disabled={loading}
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : `${ads?.length} / ${total} Load more`}
            </button>
          </div>
        )}
      </div>
    </>
  );
}