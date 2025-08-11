import SideBarPatient from '../components/SideBarPatient'; 
import '../styles/AdminDash.css'
import OrdonnanceForm from '../components/ordonnForm'

function PatientDash(){
    return(
        <>
            <SideBarPatient />
            <OrdonnanceForm/>
        </>
    )

}

export default PatientDash;