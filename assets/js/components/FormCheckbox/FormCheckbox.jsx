import FormGroup from 'react-bootstrap/lib/FormGroup'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import React from 'react'
import PropTypes from 'prop-types'

const FormCheckbox = ({label, value, onChange, isReadOnly}) => {
  const _onChange = (e) => {
    if (onChange) {
      onChange(e)
    }
  }

  const readOnly = isReadOnly ? 'disabled' : false

  return (
    <FormGroup bsSize='sm'>
      <Checkbox
        disabled={readOnly}
        checked={value}
        onChange={(e) => _onChange(e)}
        inline>{label}
      </Checkbox>
    </FormGroup>
  )
}

FormCheckbox.PropTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default FormCheckbox
