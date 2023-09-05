import React from 'react'
import { useAuth } from '../auth/AuthProvider'
import { PortalLayout } from '../layout/PortalLayout';

const Dashboard = () => {
  const auth = useAuth();

  return (
    <PortalLayout>
      <div className='container'>
        <div className='h3'>Dashboard de {auth.getUser()?.nombre}</div>
      </div>
    </PortalLayout>
  )
}

export default Dashboard