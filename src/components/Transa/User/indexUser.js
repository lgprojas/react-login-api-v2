import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../../../auth/AuthProvider';

const IndexUser = ({users, loading, loadUsers}) => {

  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const accessToken = auth.getAccessToken();

  const redirect = useNavigate();

  if(loading){
    return <h3>Loading...</h3>
  }

  const eliminarUsu = async(id) => {
  
      try {
        const response = await fetch(`https://api-nodejs-u1qp.onrender.com/v1/usuRoutes/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
        })
  
        if(response.ok){
          console.log("Usuario eliminado correctamente")
          setErrorResponse("")
          loadUsers()
  
        }else{
          console.log("Algo ocurrió")
          const data = await response.json()
          setErrorResponse(data.data.error)
        }
              
      } catch (error) {
        console.log(error)
      }
    
  }

  return (
    <div>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
            <th className='text-center'><i class="bi bi-pencil-fill"></i></th>
            <th className='text-center'><i class="bi bi-trash-fill"></i></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <td>{user.nombre}</td>
              <td>{user.usuario}</td>
              <td>{user.email}</td>
              <td className='text-center'>

              <Link to={`/editarUser/${user._id}`}  className='nav-link'><i class="bi bi-pencil"></i></Link>
                          
                </td>
              <td className='text-center'><a href='#' onClick={() => eliminarUsu(user._id)}><i class="bi bi-trash"></i></a></td>
            </tr>
          ))} 
       </tbody>
      </table>
    </div>
  )
}

export default IndexUser