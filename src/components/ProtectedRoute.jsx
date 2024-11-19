
import React from 'react';
import { Navigate } from 'react-router-dom';


// Komponenta, která slouží k ochraně přístupu k určitým stránkám na základě přítomnosti autentikačního tokenu v localstorage

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/LoginUser" replace />;
  }

  return children;
};

export default ProtectedRoute;
