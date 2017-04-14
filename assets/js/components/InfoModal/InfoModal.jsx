import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import PropTypes from 'prop-types'

const InfoModal = ({displayInfoModal, hideInfoModal, infoMsg}) => {
  return (
    <Modal show={displayInfoModal} onHide={hideInfoModal}>
      <Modal.Header closeButton>
        <Modal.Title>Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {infoMsg || ''}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideInfoModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

InfoModal.propTypes = {
  displayInfoModal: PropTypes.bool,
  infoMsg: PropTypes.string,
  hideInfoModal: PropTypes.func
}

export default InfoModal
