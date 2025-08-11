import SideBarPatient from '../components/SideBarPatient'; 
import '../styles/AdminDash.css'
import PharmaciesMap from '../components/mapComponent';

function PatientAllPharma(){
    return(
        <>
            <SideBarPatient />
            <PharmaciesMap/>
        </>
    )

}

export default PatientAllPharma;