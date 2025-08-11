import SideBarPharmacie from '../components/SideBarPharmacie'; 
import '../styles/AdminDash.css'
import TableOrdonnPharmaci from '../components/TableOrdonnPharmaci'

function PharmacieDash(){
    return(
        <>
            <SideBarPharmacie />
            <TableOrdonnPharmaci />
        </>
    )

}

export default PharmacieDash;