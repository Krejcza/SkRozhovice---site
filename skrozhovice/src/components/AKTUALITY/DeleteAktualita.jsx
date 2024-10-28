import React, { useState } from 'react';
import './AktualityMain.css';

const DeleteAktualita = ({ id, onDelete }) => {
   const [isDeleting, setIsDeleting] = useState(false);
 
   const handleDelete = async () => {
     const confirmDelete = window.confirm('Are you sure you want to delete this aktualita?');
     if (!confirmDelete) return;
 
     setIsDeleting(true);
 
     try {
       const response = await fetch(`http://localhost:5000/api/aktuality/${id}`, {
         method: 'DELETE',
         headers: {
           'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
       });
 
       if (!response.ok) throw new Error(`Error deleting aktualita: ${response.status}`);
 
       onDelete(id);
     } catch (error) {
       console.error('Error deleting aktualita:', error.message);
       alert('Failed to delete aktualita. Please try again later.');
     } finally {
       setIsDeleting(false);
     }
   };
 
   return (
     <button onClick={handleDelete} className="delete-button" disabled={isDeleting}>
       {isDeleting ? 'Deleting...' : 'Delete'}
     </button>
   );
 };

export default DeleteAktualita;
