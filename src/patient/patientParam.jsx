import SideBarPatient from "../components/SideBarPatient";
import "../styles/adminParam.css";
import UserProfile from "../components/userProfile";

function PatientParam() {
  return (
    <div className="admin-container">
      <SideBarPatient />
      <UserProfile />
    </div>
  );
}

export default PatientParam;