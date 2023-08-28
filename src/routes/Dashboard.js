import React from 'react'
import { useAuth } from '../auth/AuthProvider'
import { PortalLayout } from '../layout/PortalLayout';

const Dashboard = () => {
  const auth = useAuth();

  return (
    <PortalLayout>
      <div>Dashboard de {auth.getUser()?.nombre}</div>
    </PortalLayout>
  )
}

export default Dashboard