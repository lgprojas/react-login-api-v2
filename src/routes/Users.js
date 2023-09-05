import React from 'react'
import { PortalLayout } from '../layout/PortalLayout'
import User from '../components/User';

const Users = () => {

  return (
    <PortalLayout>
        <div className='container'>
            <div className='h3'>Área User</div>
            <User />
        </div>
    </PortalLayout>
  )
}

export default Users