import React from 'react';

const User = ({users, loading}) => {

  if(loading){
    return <h3>Loading...</h3>
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
              <td className='text-center'><i class="bi bi-pencil"></i></td>
              <td className='text-center'><i class="bi bi-trash"></i></td>
            </tr>
          ))} 
       </tbody>
      </table>
    </div>
  )
}

export default User