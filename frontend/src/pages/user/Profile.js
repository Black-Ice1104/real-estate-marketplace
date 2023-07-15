import Sidebar from "../../components/nav/Sidebar";
import ProfileUpdate from "../../components/forms/ProfileUpdate";

export default function Profile() {
  return (
    <>
      <h1 className="display-1 bg-primary text-light p-5">Profile</h1>
      <div className="contaienr-fluid">
        <Sidebar />
        <div className="container mt-2"> {/* mt-2: margin-top 2 */}
        <ProfileUpdate />
        </div>
      </div>
    </>
  );
}