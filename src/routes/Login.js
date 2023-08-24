import React, { useState } from 'react'
import { DefaultLayout } from '../layout/DefaultLayout'
import { useAuth } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom';


const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  //verifica si estás logeado
  if(auth.isAuthenticated){
    return <Navigate to="/dashboard" />
  }

  

  return (
    <DefaultLayout>
      <div className='container'>
        <h3>Login</h3>
        <div className=''>
          <form className='form' onSubmit={handleSubmit}>
            <div className='col-4 form-group p-2'>
              <label>Usuario:</label>
              <input type='text' value={username} onChange={(e) => setUserName(e.target.username)} className='form-control'/>
            </div>
            <div className='col-4 form-group p-2'>
              <label>Password:</label>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.password)} className='form-control'/>
            </div>
            <div className='col-4 form-group p-2'>
              <button className='btn btn-primary'>Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Login
