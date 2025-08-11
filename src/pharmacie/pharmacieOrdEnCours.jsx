import SideBarPharmacie from '../components/SideBarPharmacie'; 
import '../styles/AdminDash.css'
import TableOrdonnPharmaEnCours from '../components/TableOrddPharmaEnCours'

function PharmaciePharmaCours(){
    return(
        <>
            <SideBarPharmacie />
            <TableOrdonnPharmaEnCours/>
        </>
    )

}

export default PharmaciePharmaCours;