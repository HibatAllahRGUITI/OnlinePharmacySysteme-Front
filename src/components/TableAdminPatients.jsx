import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllPatients } from '../services/DataApi';

const columns = [
  { 
    id: 'nom', label: 'Nom Complet', minWidth: 200 
  },
  {
    id: 'email', label: 'Email', minWidth: 200,
  },
  {
    id: 'numTel', label: 'Numéro de téléphone', minWidth: 200,
  },
  {
    id: 'adresse', label: 'Adresse', minWidth: 200,
  },
];

export default function TablePatients() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchRequests() {
        try {
            const data = await getAllPatients();
            console.log('in the component TablePharm',data);
            setPatients(data);
        } catch (error) {
            console.error("Erreur:", error);
            setPatients([]);
        }
    }
    fetchRequests();
}, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (pharmacy) => {
    setSelectedPatient(pharmacy); // Set the selected pharmacy
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedPatient(null); // Clear the selected pharmacy
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
      Patients 💆🏻‍♀️
    </h2>
          
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {patients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((patient) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={patient.id} onClick={() => handleRowClick(patient)}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {patient[column.id] || 'N/A'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
     {/* Modal to display pharmacy details */}
     {selectedPatient && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Details du patient</DialogTitle>
          <DialogContent>
            <div><strong>Nom complet:</strong> {selectedPatient.nom}</div>
            <div><strong>Adresse:</strong> {selectedPatient.adresse}</div>
            <div><strong>Email:</strong> {selectedPatient.email}</div>
            <div><strong>Numéro de téléphone:</strong> {selectedPatient.numTel}</div>
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
