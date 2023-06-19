import Sidebar from "../../components/nav/Sidebar";

export default function Dashboard() {
  return (
    <div className="container-fluid">
      <Sidebar />
      <h1 className="display-1 bg-primary text-light p-5">User Dashboard</h1>
    </div>
  );
}