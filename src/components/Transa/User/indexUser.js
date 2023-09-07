import React from 'react';
import {Link} from "react-router-dom";
import EditarUser from './editarUser'

const indexUser = ({users, loading}) => {

  if(loading){
    return <h3>Loading...</h3>
  }

  const editarUsu = (id) => {
    
    alert(id);
  }

  const eliminarUsu = (id) => {

    alert(id); 
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
            <tr>
              <td>{user.nombre}</td>
              <td>{user.usuario}</td>
              <td>{user.email}</td>
              <td className='text-center'>

              <Link to="/editarUser" className='nav-link'><i class="bi bi-trash"></i></Link>
                          
                </td>
              <td className='text-center'><a href='#' onClick={() => eliminarUsu(user._id)}><i class="bi bi-trash"></i></a></td>
            </tr>
          ))} 
       </tbody>
      </table>
    </div>
  )
}

export default indexUser