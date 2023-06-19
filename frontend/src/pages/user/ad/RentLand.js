import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

export default function RentLand() {
  return (
    <div className="contaienr-fluid">
      <Sidebar />
      <h1 className="display-1 bg-primary text-light p-5">Rent Land</h1>
      <div className="container mt-2">
        <AdForm action="Rent" type="Land" />
      </div>
    </div>
  );
}