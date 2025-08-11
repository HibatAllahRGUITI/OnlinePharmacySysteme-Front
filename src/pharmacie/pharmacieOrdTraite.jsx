import SideBarPharmacie from '../components/SideBarPharmacie'; 
import '../styles/AdminDash.css'
import TableOrdonnPharmaciTraitee from '../components/TableOrdonnPharmaTraitee'

function PharmaciePharmaTraitee(){
    return(
        <>
            <SideBarPharmacie />
            <TableOrdonnPharmaciTraitee/>
        </>
    )

}

export default PharmaciePharmaTraitee;