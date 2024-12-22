import React, { useState } from 'react';
import './AktualityMain.css';


// Komponenta pro mazání aktuality
const DeleteAktualita = ({ id, onDelete }) => {
   const [isDeleting, setIsDeleting] = useState(false);
 

   // Asynchronní funkce pro smazání aktuality
   const handleDelete = async () => {
     const confirmDelete = window.confirm('Jste si jistí, že chcete odstranit tuto aktualitu?');
     if (!confirmDelete) return;
 
     setIsDeleting(true);
 
     try {
       const response = await fetch(`https://backend-rozhovice.onrender.com/api/aktuality/${id}`, {
         method: 'DELETE',
         headers: {
           'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
       });
 
       if (!response.ok) throw new Error(`Error deleting aktualita: ${response.status}`);
 
       onDelete(id);
     } catch (error) {
       console.error('Chyba při mazání aktuality:', error.message);
       alert('Chyba při mazání aktuality. Prosím zkuste to znovu později.');
     } finally {
       setIsDeleting(false);
     }
   };
 
   return (
     <button onClick={handleDelete} className="delete-button" disabled={isDeleting}>
       {isDeleting ? 'Probíhá mazání...' : 'Vymazat'}
     </button>
   );
 };

export default DeleteAktualita;
