import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PharmacyLandingPage from './Home.jsx'
import AuthForm from './AuthForm.jsx'
import JoinForm from './JoinForm.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AdminPharmacies from './admin/AdminPharmacies.jsx'
import AdminPatients from './admin/AdminPatients.jsx'
import MapView from './components/MapView.jsx'
import AdminParam from './admin/AdminParam.jsx'
import PatientDash from './patient/patientDash.jsx'
import PatientOrd from './patient/patientOrd.jsx'
import PatientParam from './patient/patientParam.jsx'
import PatientPharma from './patient/patientPharma.jsx'
import PatientAllPharma from './patient/patientAllPharmas.jsx'
import PharmacieDash from './pharmacie/pharmacieDash.jsx'
import PharmaParam from './pharmacie/pharmaParam.jsx'
import PharmaciePharmaTraitee from './pharmacie/pharmacieOrdTraite.jsx' 
import PharmaciePharmaAnnule from './pharmacie/pharmacieOrdRejected.jsx'
import PharmaciePharmaCours from './pharmacie/pharmacieOrdEnCours.jsx'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import ProtectedRoute from './components/ProtectedRoute.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<PharmacyLandingPage />} />
        <Route path="/Connect" element={<AuthForm />} />
        <Route path="/JoinUs" element={<JoinForm />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute element={<AdminDashboard />} requiredRole="ADMIN" />
          }
        />

        <Route 
          path="/admin/pharmacies" 
          element={
            <ProtectedRoute element={<AdminPharmacies />} requiredRole="ADMIN" />
          }
        />
        <Route 
          path="/admin/pharmacies/MapView" 
          element={
            <ProtectedRoute element={<MapView />} requiredRole="ADMIN" />
          }
        />

        <Route 
          path="/admin/patients" 
          element={
            <ProtectedRoute element={<AdminPatients />} requiredRole="ADMIN" />
          }
        />

      <Route 
          path="/admin/parametres" 
          element={
            <ProtectedRoute element={<AdminParam />} requiredRole="ADMIN" />
          }
        />


        <Route 
          path="/pharmacie/dashboard" 
          element={
            <ProtectedRoute element={<PharmacieDash />} requiredRole="PHARMACIE" />
          }
        />

      <Route 
          path="/pharmacie/parametres" 
          element={
            <ProtectedRoute element={<PharmaParam />} requiredRole="PHARMACIE" />
          }
        />
        <Route 
          path="/pharmacie/traites" 
          element={
            <ProtectedRoute element={<PharmaciePharmaTraitee />} requiredRole="PHARMACIE" />
          }
        />
        <Route 
          path="/pharmacie/annules" 
          element={
            <ProtectedRoute element={<PharmaciePharmaAnnule />} requiredRole="PHARMACIE" />
          }
        />
        <Route 
          path="/pharmacie/cours" 
          element={
            <ProtectedRoute element={<PharmaciePharmaCours />} requiredRole="PHARMACIE" />
          }
        />
        
        
        
        
        <Route 
          path="/patient/dashboard" 
          element={
            <ProtectedRoute element={<PatientDash />} requiredRole="PATIENT" />
          }
        />
         <Route 
          path="/patient/ordonnances" 
          element={
            <ProtectedRoute element={<PatientOrd />} requiredRole="PATIENT" />
          }
        />
        <Route 
          path="/patient/parametres" 
          element={
            <ProtectedRoute element={<PatientParam />} requiredRole="PATIENT" />
          }
        />
        <Route 
          path="/patient/nearbyPharmacies" 
          element={
            <ProtectedRoute element={<PatientPharma />} requiredRole="PATIENT" />
          }
        />
        <Route 
          path="/patient/pharmacies" 
          element={
            <ProtectedRoute element={<PatientAllPharma />} requiredRole="PATIENT" />
          }
        />

        
        
      </Routes>
    </Router>
  </StrictMode>,
)
