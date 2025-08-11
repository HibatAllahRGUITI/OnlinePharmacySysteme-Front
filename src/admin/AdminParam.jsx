import SideBar from "../components/SideBar";
import "../styles/adminParam.css";
import UserProfile from "../components/userProfile";

function AdminParam() {
  return (
    <div className="admin-container">
      <SideBar />
      <UserProfile />
    </div>
  );
}

export default AdminParam;
