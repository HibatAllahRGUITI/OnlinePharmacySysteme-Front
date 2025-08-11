import {
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination, Box, Modal, Button, FormControl, InputLabel, Select, MenuItem
  } from "@mui/material";
import {  Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';

import { useEffect, useState } from 'react';
import { updateOrdonnanceStatus, getOrdonnanceSoumise } from '../services/pharmacyApi';
import { fetchOrdonnanceImage } from '../services/OrdApi2'

const columns = [
    { id: "PatientNom", label: "Patient", minWidth: 200 },
    { id: "dateCreation", label: "Date d'envoi", minWidth: 200 },
    { id: "statut", label: "Statut de l'ordonnance", minWidth: 200 },
];

export default function TableOrdonnPharmaci() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [ordonnances, setOrdonnances] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState({}); 
  const statuses = ['SOUMISE', 'EN_COURS', 'TRAITEE', 'ANNULEE'];
  const [selectedOrd, setSelectedOrd] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleStatusChange =async  (id) => {
    const newStatus = selectedStatuses[id];
    if (!newStatus) return;

    // Update status in the backend
    try {
      await updateOrdonnanceStatus(id, newStatus);
      console.log('Updated Ordonnance:', id);
      await fetchRequests(); // Refetch ordonnances
    } catch (error) {
      console.error('Error updating ordonnance status:', error);
    }
      

      
      
  };

  const fetchRequests = async () => {
    try {
      const data = await getOrdonnanceSoumise();
      if (!data || data.error) {
        console.warn("No ordonnances found:", data?.error || "Empty response");
        setOrdonnances([]); 
        return;
      }
      console.log('Ordonnances:', data);
      setOrdonnances(data);
    } catch (error) {
      console.error("Erreur:", error);
      setOrdonnances([]);
    }
  };

  useEffect(() => {
    fetchRequests();
}, []);

const handleOpen = async (id) => {
    try {
      const image = await fetchOrdonnanceImage(id);
      setSelectedImage(`data:image/jpeg;base64,${image}`);
      setOpen(true);
    } catch (error) {
      console.error("Erreur de récupération de l'image:", error);
    }
  };

  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusSelectChange = (id, event) => {
    setSelectedStatuses({
      ...selectedStatuses,
      [id]: event.target.value, 
    });
  };

  const handleRowClick = (ord) => {
    setSelectedOrd(ord); // Set the selected pharmacy
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedOrd(null); // Clear the selected pharmacy
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
      Ordonnances en attente 📝
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
                <TableCell>
                   
                  </TableCell>
                  <TableCell>
                   
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { ordonnances.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 2} style={{ textAlign: 'center' }}>
                    Aucun ordonnance trouvée
                  </TableCell>
                </TableRow>
              ) : (ordonnances.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ordonnance) => (
                <TableRow hover key={ordonnance.id} onClick={() => handleRowClick(ordonnance)}>
                  <TableCell>{ordonnance.patientNom || "N/A"}</TableCell>
                  <TableCell>{new Date(ordonnance.dateCreation).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>{ordonnance.statut || "N/A"}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleOpen(ordonnance.id)}>Voir l&apos;image</Button>
                  </TableCell>
                  <TableCell>
                      <FormControl>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={selectedStatuses[ordonnance.id] || ordonnance.statut}
                          onChange={(event) => handleStatusSelectChange(ordonnance.id, event)}
                          label="Status"
                        >
                          {statuses.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Button variant="outlined" onClick={() => handleStatusChange(ordonnance.id)}>
                        Modifier statut
                      </Button>
                    </TableCell>
                    
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={ordonnances.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: "80%", height: "80%", backgroundColor: "white", margin: "auto", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {selectedImage ? (
            <img src={selectedImage} alt="Ordonnance" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          ) : (
            <p>Aucune image disponible</p>
          )}
        </Box>
      </Modal>
    </Box>

     {/* Modal to display pharmacy details */}
     {selectedOrd && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Details de l&apos;ordonnance</DialogTitle>
          <DialogContent>
            <div><strong>Nom du patient:</strong> {selectedOrd.patientNom}</div>
            <div><strong>Date d&apos;envoi:</strong> {new Date(selectedOrd.dateCreation).toLocaleDateString()}</div>
            {selectedOrd.dateTraitement && (
                <div><strong>Date de fin de traitement:</strong> {new Date(selectedOrd.dateTraitement).toLocaleDateString()}</div>
            )}            
            {selectedOrd.dateRejection && (
                <div><strong>Date d&apos;annulation:</strong> {new Date(selectedOrd.dateRejection).toLocaleDateString()}</div>
            )}

            
            <div><strong>Status de l&apos;ordonnance:</strong> {selectedOrd.statut}</div>
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
