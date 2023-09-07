import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const nuevoUser = ({show, handleClose}) => {

  const handleSubmit = () => {
    alert('Guardando...')
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo usuario</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Form</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secundary' onClick={handleClose}>Cerrar</Button>
          <Button variant='primary' onClick={handleSubmit}>Guardar</Button>
        </Modal.Footer>
      </Modal>  
    </>
  )
}

export default nuevoUser