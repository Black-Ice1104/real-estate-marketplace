import { useEffect, useState } from "react";
import Sidebar from "../../../components/nav/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdEditForm from "../../../components/forms/AdEditForm";

export default function AdEdit() {
  // state
  const [ad, setAd] = useState({
    _id: "",
    photos: [],
    uploading: "",
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    type: "",
    action: "",
    title: "",
    description: "",
    loading: "",
  });
  // hooks
  const params = useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (params?.slug) fetchAd();
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data.ad); // {ad: {}, related: []}
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="contaienr-fluid">
      <Sidebar />
      <h1 className="display-1 bg-primary text-light p-5">Edit Ad</h1>
      {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
      <pre>
          {ad?.address && (
            <AdEditForm action={ad.action} type={ad.type} ad={ad} setAd={setAd}/>
          )}
      </pre>
    </div>

  );
}