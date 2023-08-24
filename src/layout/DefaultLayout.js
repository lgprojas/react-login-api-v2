import React from 'react'
import { Link } from 'react-router-dom'

export const DefaultLayout = ({children}) => {
  return (
    <>
        <header>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div class="container-fluid">
                    
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <Link to="/" className='nav-link'>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/signup" className='nav-link'>Signup</Link>
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
