import SideBarPharmacie from '../components/SideBarPharmacie'; 
import '../styles/AdminDash.css'
import TableOrdonnPharmaciAnnule from '../components/TablrOrdonnPharmAnnule'

function PharmaciePharmaAnnule(){
    return(
        <>
            <SideBarPharmacie />
            <TableOrdonnPharmaciAnnule/>
        </>
    )

}

export default PharmaciePharmaAnnule;