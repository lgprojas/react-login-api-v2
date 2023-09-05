import React, { useEffect, useState } from 'react';

const User = () => {
  const [data, setData] = useState([]);
  const [errorResponse, setErrorResponse] = useState("");

  useEffect(() => {
    loadUsers();
  }, [])

  const loadUsers = async() => {
      try {
          const response = await fetch('https://api-nodejs-u1qp.onrender.com/v1/usuRoutes', {
              headers: {
                  "Content-Type": "application/json"
              },
          })

          if(response.ok){                
              setErrorResponse("")
              const users = await response.json();//La respuesta de la API   
              setData(users.data)
              console.log(users.data)
          }else{
              console.log("Algo ocurrió al traer los users")
              const users = await response.json()
              setData(users.data)
              setErrorResponse(users.data.error)
          }
              
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <div>
      <div className='p-2'><button className='btn btn-outline-secondary'><i class="bi bi-plus-circle"></i> Nuevo</button></div>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Usuario</th>
            <th className='text-center'><i class="bi bi-pencil-fill"></i></th>
            <th className='text-center'><i class="bi bi-trash-fill"></i></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user, index) => (
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
      <div className='p-2'><button className='btn btn-outline-secondary'><i class="bi bi-plus-circle"></i> Nuevo</button></div>
    </div>
  )
}

export default User