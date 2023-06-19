import { useParams } from "react-router-dom";

export default function AdView() {
  const params = useParams();
  return <>{params.slug}</>;
}