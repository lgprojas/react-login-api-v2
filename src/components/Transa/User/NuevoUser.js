import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { show_alerta } from '../../../utils/functions';

//import { Navigate, useNavigate } from 'react-router-dom';

const NuevoUser = ({show, handleClose, loadUsers}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");


  //const redirect = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(name.trim() === ''){
      show_alerta("Debe ingresar nombre", "warning")
    }

    try {
      const response = await fetch('https://api-nodejs-u1qp.onrender.com/v1/usuRoutes/', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "nombre": name,
              "email": email,
              "usuario": username,
              "clave": password
            })
      })

      if(response.ok){
        console.log("Usuario creado correctamente")
        show_alerta("Usuario creado correctamente", "success")
        setErrorResponse("")
        handleClose();
        loadUsers();

      }else{
        console.log("Algo ocurrió")
        const data = await response.json()
        show_alerta(data.data.error, "warning")
        setErrorResponse(data.data.error)
      }
            
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo usuario</Modal.Title>
        </Modal.Header>
        <form className='form' onSubmit={handleSubmit}>
          <Modal.Body>
          <div className=''>
            {errorResponse ? 
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i> {errorResponse}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> 
                : ''}
              <div className='col-4 form-group p-2'>
                <label>Nombre:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='form-control'/>
              </div>
              <div className='col-4 form-group p-2'>
                <label>Email:</label>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control'/>
              </div>
              <div className='col-4 form-group p-2'>
                <label>Usuario:</label>
                <input type='text' value={username} onChange={(e) => setUserName(e.target.value)} className='form-control'/>
              </div>
              <div className='col-4 form-group p-2'>
                <label>Password:</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control'/>
              </div>
            
          </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secundary' onClick={handleClose}>Cerrar</Button>
            <Button variant='primary' onClick={handleSubmit}>Guardar</Button>
          </Modal.Footer>
        </form>
      </Modal>  
    </>
  )
}

export default NuevoUser
