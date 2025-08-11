import SideBar from '../components/SideBar';
import TableComp from '../components/TableAdminDash'; 
import '../styles/AdminDash.css'

function AdminDashboard(){
    return(
        <>
            <SideBar />
            
            <TableComp />
        </>
    )

}

export default AdminDashboard;