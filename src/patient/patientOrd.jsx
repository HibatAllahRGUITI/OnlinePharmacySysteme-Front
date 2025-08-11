import SideBarPatient from '../components/SideBarPatient'; 
import '../styles/AdminDash.css'
import TableOrdonnPatient from '../components/ordonnListPatient'

function PatientOrd(){
    return(
        <>
            <SideBarPatient />
            <TableOrdonnPatient />
        </>
    )

}

export default PatientOrd;