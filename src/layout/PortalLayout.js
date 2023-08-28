import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export const PortalLayout = ({children}) => {
    const auth = useAuth();
    
    const handleSignOut = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://api-nodejs-u1qp.onrender.com/v1/loginRoutes/signout`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.getRefreshToken()}`,
              },
            });
            if (response.ok) {
              auth.signOut();
            }
          } catch (error) {
            console.log(error);
          }
    }

  return (
    <>
        <header>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div class="container-fluid">
                    
                    <a class="navbar-brand" href="#">React</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <Link to="/dashboard" className='nav-link'>Dashboard</Link>
                            </li>
                            <li className='nav-item'>
                                <a href="#" onClick={handleSignOut} className='nav-link' >Singout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <main>{children}</main>
    </>
  )
}
