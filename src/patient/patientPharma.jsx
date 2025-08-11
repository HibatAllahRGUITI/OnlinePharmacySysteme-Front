import SideBarPatient from '../components/SideBarPatient'; 
import '../styles/AdminDash.css'
import MapWithPharmacies from '../components/mapWithPharmacies';

function PatientPharma(){
    return(
        <>
            <SideBarPatient />
            <MapWithPharmacies/>
        </>
    )

}

export default PatientPharma;