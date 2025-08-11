import SideBarPharmacie from '../components/SideBarPharmacie'; 
import "../styles/adminParam.css";
import PharmacieProfile from "../components/PharmacieProfile";

function PharmaParam() {
  return (
    <div className="admin-container">
      <SideBarPharmacie />
      <PharmacieProfile />
    </div>
  );
}

export default PharmaParam;