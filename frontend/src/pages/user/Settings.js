import Sidebar from "../../components/nav/Sidebar";
import PasswordUpdate from "../../components/forms/PasswordUpdate";

export default function Settings() {
  return (
    <div className="contaienr-fluid">
      <Sidebar />
      <div className="container mt-2">
        <PasswordUpdate />
      </div>
    </div>
  );
}