import React, { useEffect, useState } from 'react';
import { PortalLayout } from '../layout/PortalLayout'
import User from '../components/Transa/User/indexUser.js';
import NuevoUser from '../components/Transa/User/nuevoUser.js';
import Pagination from '../components/Pagination';

const Users = () => {

  const [data, setData] = useState([]);
  const [errorResponse, setErrorResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [registrosPerPage] = useState(2);

  //-- Modal 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //--/Modal

  useEffect(() => {
    loadUsers();
  }, [])

  const loadUsers = async() => {
      setLoading(true)

      try {
          const response = await fetch('https://api-nodejs-u1qp.onrender.com/v1/usuRoutes', {
              headers: {
                  "Content-Type": "application/json"
              },
          })

          if(response.ok){                
              setErrorResponse("")

              const users = await response.json();//La respuesta de la API   
              console.log(users.data)
              setData(users.data)
              setLoading(false)
          }else{
              console.log("Algo ocurrió al traer los users")
              const users = await response.json()
              console.log(users.data)
              setData(users.data)
              setErrorResponse(users.data.error)
              setLoading(false)
          }
              
      } catch (error) {
        console.log(error)
          setErrorResponse(error)
          setLoading(false)
      }
  }

  const indexOfLastRegistro = currentPage * registrosPerPage; //1*10=10
  const indexOfFirstRegistro = indexOfLastRegistro - registrosPerPage;//10-10=0
  const currentRegistros = data.slice(indexOfFirstRegistro, indexOfLastRegistro);//paginas de 0 a 10
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <PortalLayout>
        <div className='container'>
            <div className='h3'>Área User</div>
            <div className='p-2'><button className='btn btn-outline-secondary' onClick={handleShow}><i class="bi bi-plus-circle"></i> Nuevo</button></div>
            <User users={currentRegistros} loading={loading} />
            <Pagination registrosPerPage={registrosPerPage} totalRegistros={data.length} paginate={paginate}/>
            <div className='p-2'><button className='btn btn-outline-secondary' onClick={handleShow}><i class="bi bi-plus-circle"></i> Nuevo</button></div>
            <NuevoUser show={show} handleClose={handleClose} />
        </div>
    </PortalLayout>
  )
}

export default Users