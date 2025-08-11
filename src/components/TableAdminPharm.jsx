import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllPharmacies } from '../services/DataApi';
import { useNavigate } from 'react-router-dom';
import updatePharmacyStatus from '../services/pharmacyApi';

const columns = [
  { id: 'nom', label: 'Nom de pharmacie', minWidth: 140 },
  { id: 'numRegistration', label: 'Numero de registration', minWidth: 100},
  { id: 'adresse', label: 'Adresse', minWidth: 120,},
  { id: 'email', label: 'Email', minWidth: 120,},
  { id: 'numTel', label: 'Numéro de téléphone', minWidth: 100,},
  { id: 'latitude', label: 'Latitude', minWidth: 70,},
  { id: 'longitude', label: 'Longitude', minWidth: 70,},
  {id: 'statutPharmacie', label: 'Status de pharmacie', minWidth: 120,},
];

export default function TablePharm() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pharms, setPharms] = useState([])
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPharmacies() {
        try {
            const data = await getAllPharmacies();
            console.log('in the component TablePharm',data);
            setPharms(data);
        } catch (error) {
            console.error("Erreur:", error);
            setPharms([]);
        }
    }
    fetchPharmacies();
}, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (pharmacy) => {
    setSelectedPharmacy(pharmacy); // Set the selected pharmacy
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedPharmacy(null); // Clear the selected pharmacy
  };


  const handleShowLocation = (pharmacy) => {
    alert(
      `Pharmacy: ${pharmacy.nom}\nLatitude: ${pharmacy.latitude}\nLongitude: ${pharmacy.longitude}`
    );
    navigate('/admin/pharmacies/MapView', {state : pharmacy
    })

  };

  const handleStatusChange = async (pharmacyId) => {
    try {
      console.log(pharmacyId)
      const updatedPharmacy = await updatePharmacyStatus(pharmacyId);
      console.log("Updated Pharmacy Response:", updatedPharmacy);

      setPharms((prevPharms) =>
      prevPharms.map((pharmacy) =>
        pharmacy.id === pharmacyId 
          ? { ...pharmacy, statutPharmacie: updatedPharmacy.statutPharmacie } 
          : pharmacy
      )
    );
      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating pharmacy status:", error);
      alert("Failed to update status");
    }
  };
  

  return (
    <>
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        ml: 25,
      }}
    >
      <h2 
      className="title"
      style={{
        textAlign: 'center', 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        marginBottom: '6rem',
        marginTop: '2rem',
        
      }}
    >
      Pharmacies partenaires ⚕️
    </h2>
          
    <Paper sx={{ width: '95%', overflow: 'hidden' }}>

        <TableContainer sx={{ maxHeight: 500 }}>

          <Table stickyHeader aria-label="sticky table">


            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                  
                ))}
                <TableCell>
                  Actions
                  </TableCell>
              </TableRow>
            </TableHead>


            <TableBody>
              {pharms
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((pharmacie) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={pharmacie.id} onClick={() => handleRowClick(pharmacie)}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {pharmacie[column.id] || 'N/A'}
                      </TableCell>
                    ))}
                    <TableCell>
                      <button
                        onClick={() => handleShowLocation(pharmacie)}
                        style={{
                          backgroundColor: '#28d48c',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Afficher localisation
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleStatusChange(pharmacie.id)}
                        style={{
                          backgroundColor: '#D70040',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Changer statut
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>


        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={pharms.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

    </Box>

    {/* Modal to display pharmacy details */}
    {selectedPharmacy && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Details de la pharmacie</DialogTitle>
          <DialogContent>
            <div><strong>Nom de pharmacie:</strong> {selectedPharmacy.nom}</div>
            <div><strong>Numéro de registration:</strong> {selectedPharmacy.numRegistration}</div>
            <div><strong>Adresse:</strong> {selectedPharmacy.adresse}</div>
            <div><strong>Email:</strong> {selectedPharmacy.email}</div>
            <div><strong>Numéro de téléphone:</strong> {selectedPharmacy.numTel}</div>
            <div><strong>Latitude:</strong> {selectedPharmacy.latitude}</div>
            <div><strong>Longitude:</strong> {selectedPharmacy.longitude}</div>
            <div><strong>Status de pharmacie:</strong> {selectedPharmacy.statutPharmacie}</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
