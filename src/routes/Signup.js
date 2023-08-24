import React, { useState } from 'react'
import { DefaultLayout } from '../layout/DefaultLayout'
import { useAuth } from '../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const redirect = useNavigate();

  //verifica si estás logeado
  if(auth.isAuthenticated){
    return <Navigate to="/dashboard" />
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

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
        setErrorResponse("")
        redirect("/")

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
    <DefaultLayout>
      <div className='container'>
        <h3>Signup</h3>
        <div className=''>
          {errorResponse ? 
              <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-triangle-fill"></i> {errorResponse}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div> 
              : ''}
          <form className='form' onSubmit={handleSubmit}>
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
            <div className='col-4 form-group p-2'>
              <button className='btn btn-primary'>Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Signup