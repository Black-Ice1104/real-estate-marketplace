import Sidebar from "../../components/nav/Sidebar";
import PasswordUpdate from "../../components/forms/PasswordUpdate";

export default function Settings() {
  return (
    <>
      <h1 className="display-1 bg-primary text-light p-5">Settings</h1>
      <div className="contaienr-fluid">
        <Sidebar />
        <div className="container mt-2">
          <PasswordUpdate />
        </div>
      </div>
    </>
  );
}