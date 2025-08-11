import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = JSON.parse(atob(token.split('.')[1])); 
    console.log('token decoded in the protectedRoute compnent', decoded.role)
    return decoded.role || null; 
  }
  return null;
};

const ProtectedRoute = ({ element, requiredRole }) => {
  const userRole = getUserRole();

  if (userRole !== requiredRole) {
    return <Navigate to="/" />; 
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired, 
  requiredRole: PropTypes.string.isRequired, 
};

export default ProtectedRoute;