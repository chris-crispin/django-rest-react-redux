import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import PropTypes from 'prop-types'
import './styles.scss'

const AboutModal = ({displayModal, hideModal}) => {
  return (
    <Modal show={displayModal} onHide={hideModal} className='modal'>
      <Modal.Header closeButton>
        <Modal.Title>About Django-rest-react-redux</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Django-REST</h4>
        <p>Duis mollis, est non commodo luctus, nisi erat porttitor
          ligula.</p>
        <hr />
        <h4>React/Redux</h4>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras
          justo
          odio, dapibus ac facilisis in, egestas eget quam. Morbi
          leo
          risus, porta ac consectetur ac, vestibulum at eros.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

AboutModal.propTypes = {
  displayModal: PropTypes.bool,
  hideModal: PropTypes.func
}

export default AboutModal
