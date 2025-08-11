import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { getAllRequests, acceptRequest, rejectRequest, getRefusedRequests, getAcceptedRequests } from '../services/DataApi';


const columns = [
  { 
    id: 'nom', label: 'Nom de pharmacie', minWidth: 170 
  },
  {
     id: 'numRegistration', label: 'Numero de resistration', minWidth: 100
 },
 {
  id: 'adresse', label: 'Adresse', minWidth: 100
},
  {
    id: 'email', label: 'Email', minWidth: 170,
  },
  {
    id: 'numTel', label: 'Numéro de téléphone', minWidth: 170,
  },
  {
    id: 'latitude', label: 'Latitude', minWidth: 70,
  },
  {
    id: 'longitude', label: 'Longitude', minWidth: 70,
  },
  {
    id: 'dateRequested', label: 'Date de demande', minWidth: 140,
  },
];

const firstTableColumns = [...columns];
const seconTableColumns = [...columns,  { id: 'dateAccepted', label: 'Date d\'acceptation', minWidth: 140 }]
const thirdTableColumns = [...columns,  { id: 'dateDisapproved',  label: 'Date de refus', minWidth: 140 }]


/*const rows = [
    createData('India', 'IN', 'india@example.com', '+91-1234567890', 20.5937, 78.9629, '2024-12-08'),
    createData('China', 'CN', 'china@example.com', '+86-1234567890', 35.8617, 104.1954, '2024-12-08'),
    createData('Italy', 'IT', 'italy@example.com', '+39-1234567890', 41.8719, 12.5674, '2024-12-08'),
    createData('United States', 'US', 'usa@example.com', '+1-1234567890', 37.0902, -95.7129, '2024-12-08'),
    createData('Canada', 'CA', 'canada@example.com', '+1-9876543210', 56.1304, -106.3468, '2024-12-08'),
    createData('Australia', 'AU', 'australia@example.com', '+61-1234567890', -25.2744, 133.7751, '2024-12-08'),
    createData('Germany', 'DE', 'germany@example.com', '+49-1234567890', 51.1657, 10.4515, '2024-12-08'),
    createData('Ireland', 'IE', 'ireland@example.com', '+353-1234567890', 53.4129, -8.2439, '2024-12-08'),
    createData('Mexico', 'MX', 'mexico@example.com', '+52-1234567890', 23.6345, -102.5528, '2024-12-08'),
    createData('Japan', 'JP', 'japan@example.com', '+81-1234567890', 36.2048, 138.2529, '2024-12-08'),
    createData('France', 'FR', 'france@example.com', '+33-1234567890', 46.6034, 1.8883, '2024-12-08'),
    createData('United Kingdom', 'GB', 'uk@example.com', '+44-1234567890', 55.3781, -3.4360, '2024-12-08'),
    createData('Russia', 'RU', 'russia@example.com', '+7-1234567890', 61.5240, 105.3188, '2024-12-08'),
    createData('Nigeria', 'NG', 'nigeria@example.com', '+234-1234567890', 9.0820, 8.6753, '2024-12-08'),
    createData('Brazil', 'BR', 'brazil@example.com', '+55-1234567890', -14.2350, -51.9253, '2024-12-08'),
  ];*/

export default function TableComp() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [requests, setRequests] = useState([])
  const [accepted, setAccepted] = useState([])
  const [refused, setRefused] = useState([])


  const fetchRequests = async () => {
    try {
      const data = await getAllRequests();
      console.log(data);
      setRequests(data);
    } catch (error) {
      console.error('Erreur:', error);
      setRequests([]);
    }
  };

  const fetchAcceptedRequests = async () => {
    try {
      const data = await getAcceptedRequests();
      console.log(data);
      setAccepted(data);
    } catch (error) {
      console.error('Erreur:', error);
      setRequests([]);
    }
  };

  const fetchRefusedRequests = async () => {
    try {
      const data = await getRefusedRequests();
      console.log(data);
      setRefused(data);
    } catch (error) {
      console.error('Erreur:', error);
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchAcceptedRequests();
    fetchRefusedRequests();
}, []);

  const handleAcceptRequest = async (id) => {
    try{
        await acceptRequest(id);
        alert('Demande acceptée avec succès');
        fetchRequests();
        fetchAcceptedRequests();
        fetchRefusedRequests();
    }catch(error){
      console.error('Erreur lors de l\'acceptation:', error)
    }
  }

  const handleRejectRequest = async (id) => {
    try{
        await rejectRequest(id);
        alert('Demande refusée avec succès');
        fetchRequests();
        fetchAcceptedRequests();
        fetchRefusedRequests();
    }catch(error){
      console.error('Erreur lors du rejet de la demande:', error)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = requests;
  const rows_accepted = accepted;
  const rows_refused = refused;

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
      Demandes de rejoindre la plateforme ⏳
    </h2>
          
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 ,backgroundColor: 'white'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {firstTableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const uniqueId = row.id;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={uniqueId}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'dateRequested' && typeof value === 'number') {
                        const date = new Date(value);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </TableCell>
                          
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <button
                        onClick={() => handleAcceptRequest(row.id)}
                        style={{
                          backgroundColor: '#28d48c',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Accepter
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleRejectRequest(row.id)}
                        style={{
                          backgroundColor: '#C41E3A',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Refuser
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Box>

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
      Demandes acceptées ✔️
    </h2>
          
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 , backgroundColor: 'white'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {seconTableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
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
            {rows_accepted
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const uniqueId = row.id;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={uniqueId}>
                    {seconTableColumns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'dateRequested' && typeof value === 'number') {
                        const date = new Date(value);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </TableCell>
                          
                        );
                      }
                      if (column.id === 'dateAccepted') {
                        const date = new Date(value);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Box>



    <Box
      sx={{
        height: '60vh',
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
      Demandes refusées ❌
    </h2>
          
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 , backgroundColor: '#fff'}}>
        <Table stickyHeader aria-label="sticky table" sx={{ backgroundColor: '#fff' }}>
          <TableHead>
            <TableRow>
              {thirdTableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
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
            {rows_refused
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const uniqueId = row.id;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={uniqueId}>
                    {thirdTableColumns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'dateRequested' && typeof value === 'number') {
                        const date = new Date(value);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </TableCell>
                          
                        );
                      }
                      if (column.id === 'dateDisapproved') {
                        const date = new Date(value);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Box>
    </>
  );
}
