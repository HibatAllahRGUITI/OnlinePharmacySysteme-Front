import {
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination, Box, Modal, Button
  } from "@mui/material";
import { useEffect, useState } from 'react';
import { fetchOrdonnances, fetchOrdonnanceImage } from '../services/OrdApi2';

const columns = [
    { id: "pharmacieNom", label: "Pharmacie", minWidth: 200 },
    { id: "dateCreation", label: "Date d'envoi", minWidth: 200 },
    { id: "statut", label: "Statut de l'ordonnance", minWidth: 200 },
    { id: "dateTraitement", label: "Date de traitement", minWidth: 200 },
];

export default function TableOrdonnPatient() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ordonnances, setOrdonnances] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
        try {
            const data = await fetchOrdonnances();
            console.log('in the component TablePharm',data);
            setOrdonnances(data);
        } catch (error) {
            console.error("Erreur:", error);
            setOrdonnances([]);
        }
    }
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
      Ordonnances 📝
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
              {ordonnances.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ordonnance) => (
                <TableRow hover key={ordonnance.id}>
                  <TableCell>{ordonnance.pharmacieNom || "N/A"}</TableCell>
                  <TableCell>{new Date(ordonnance.dateCreation).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>{ordonnance.statut || "N/A"}</TableCell>
                  <TableCell>
                    {ordonnance.dateTraitement
                      ? new Date(ordonnance.dateTraitement).toLocaleDateString("fr-FR")
                      : "Pas encore traité"}
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleOpen(ordonnance.id)}>Voir l&apos;image</Button>
                  </TableCell>
                </TableRow>
              ))}
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
    </>
  );
}
