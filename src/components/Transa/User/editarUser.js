import React, {useState, useEffect} from 'react'
import { PortalLayout } from '../../../layout/PortalLayout'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { show_alerta } from '../../../utils/functions';

const EditarUser = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const accessToken = auth.getAccessToken()

  const redirect = useNavigate();

    const { id } = useParams();//obtiene el parametro del Link

    useEffect(() => {
      getUser()
    }, []);

    const getUser = async() => {
      //e.preventDefault();
  
      try {
        const response = await fetch(`https://api-nodejs-u1qp.onrender.com/v1/usuRoutes/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              }
        })

  
        if(response.ok){
          console.log("Se obtiene los datos del usuario")
          setErrorResponse("")
          const data = await response.json()
          setUser(data.data)
  
        }else{
          console.log("Algo ocurrió")
          const data = await response.json()
          setErrorResponse(data.data.error)
        }
              
      } catch (error) {
        console.log(error)
      }
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(`https://api-nodejs-u1qp.onrender.com/v1/usuRoutes/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                "nombre": name,
                "email": email,
              })
        })
  
        if(response.ok){
          console.log("Usuario actualizado correctamente")
          show_alerta("Usuario actualizado correctamente", "success")
          setErrorResponse("")
          redirect("/users")
  
        }else{
          console.log("Algo ocurrió")
          show_alerta("Algo ocurrió", "warning")
          const data = await response.json()
          setErrorResponse(data.data.error)
        }
              
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <PortalLayout>
        <div className='container'>
            editar usuario: {id}
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
                  <input type='text' name="nombre" defaultValue={user.nombre} onChange={(e) => setName(e.target.value)} className='form-control'/>
                </div>
                <div className='col-4 form-group p-2'>
                  <label>Email:</label>
                  <input type='text' name="email" defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} className='form-control'/>
                </div>
                <div className='col-4 form-group p-2'>
                  <button className='btn btn-primary'>Guardar</button>
                </div> 
              </form>          
          </div>
        </div>
    </PortalLayout>
  )
}

export default EditarUser