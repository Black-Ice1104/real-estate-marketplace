import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "../components/misc/ImageGallery";
import AdFeatures from "../components/cards/AdFeatures";
import {formatNumber} from "../helpers/ad";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeUnlike from "../components/misc/LikeUnlike";
import MapCard from "../components/cards/MapCard";
import parse from 'html-react-parser';
import AdCard from "../components/cards/AdCard";
import ContactSeller from "../components/forms/ContactSeller";

dayjs.extend(relativeTime);

export default function AdView() {
  // states
  const [ad, setAd] = useState({});
  const [related, setRelated] = useState([]);
  // hooks
  const params = useParams();

  useEffect(() => {
    if(params?.slug) fetchAd();
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params?.slug}`);
      setAd(data?.ad);
      setRelated(data?.related);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-lg-4 mt-2">
            <div className="d-flex justify-content-between">
              {/* ad.type ? House/Land for sell/rent */}
              <button className="btn btn-primary disabled mt-5">
                {ad.type ? ad.type : ""} for {ad.action ? ad.action : ""}
              </button>
              <LikeUnlike ad={ad} />
            </div>
            <br />
            <p className="text h5 m-2 mt-5">
              {ad?.sold ? "❌ Off market" : "✅ In market"}
            </p>
            <h1 className="mt-5">{ad.address}</h1>
            <AdFeatures ad={ad} />
            <h3 className="mt-3 h2">${formatNumber(ad?.price)}</h3>
            <p className="d-flex justify-content-between mt-4">
              <span>Added {dayjs(ad?.createdAt).fromNow()}</span>{" "}
              <span>{ad?.views} Views</span>
            </p>
          </div>
          <div className="col-lg-8">
            <ImageGallery ad={ad}/>
          </div>
        </div>
      </div>
      
      {/* show Google Map and info details */}
      <div className="container mb-5 ">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 mt-3">
            <MapCard ad={ad} />
            <h1 className="mt-3">
              {ad?.type} in {ad?.address} for {ad?.action} ${ad?.price}
            </h1>
            <AdFeatures ad={ad} />
            <hr />
            <h3>{ad?.title}</h3>
            <p className="lead">
              {/* {ad?.description?.replaceAll(". ", "<br/><br/>")} */}
              {parse((ad?.description || "").replaceAll(/\.\s/g, '<br/><br/>'))}
            </p>
          </div>
        </div>
      </div>

      {/* show contact seller button */}
      <div className="container md-5 mb-5">
        <ContactSeller ad={ad} />
      </div>

      {/* show related ads */}
      <h4 className="text-center">Related Properties</h4>
      <hr />
      <div className="container">
        <div className="row">
          {related?.map((ad) => (
            <><AdCard key={ad._id} ad={ad} /></>
          ))}
        </div>
      </div>

      {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
    </>
  );
}