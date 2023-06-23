import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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

  // const photos = [
  //   {
  //     src: "https://image-bucket.s3.amazonaws.com/xxx.jpeg",
  //     width: 4,
  //     height: 3,
  //   },
  //   {
  //     src: "https://image-bucket.s3.amazonaws.com/xxx.jpeg",
  //     width: 1,
  //     height: 1,
  //   },
  // ];

  return (
    <>
      <pre>{JSON.stringify(ad, null, 4)}</pre>
    </>
  );
}