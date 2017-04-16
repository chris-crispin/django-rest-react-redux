import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import React from 'react'
import PropTypes from 'prop-types'

const FormField = ({label, type, value, helpText, onChange, validate, isReadOnly}) => {
  const _onChange = (e) => {
    if (onChange) {
      onChange(e)
    }
  }
  const readOnly = isReadOnly ? 'readOnly' : false
  let values = null
  if (Array.isArray(value)) {
    values = ''
    value.forEach((item, i) => {
      values += `${i + 1}. ${item} `
    })
  }

  return (
    <div>
      { validate &&
        <FormGroup bsSize='sm' validationState={validate()}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl
            readOnly={readOnly}
            type={type || 'text'}
            value={values || value}
            onChange={(e) => _onChange(e)} />
          <FormControl.Feedback />
          { helpText &&
            <HelpBlock>{helpText}</HelpBlock> }
        </FormGroup>
      }
      { !validate &&
        <FormGroup bsSize='sm'>
          <ControlLabel>{label}</ControlLabel>
          <FormControl
            readOnly={readOnly}
            type={type || 'text'}
            value={values || value}
            onChange={(e) => _onChange(e)} />
          <FormControl.Feedback />
          { helpText &&
            <HelpBlock>{helpText}</HelpBlock> }
        </FormGroup>
      }
    </div>
  )
}

FormField.PropTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  onChange: PropTypes.func,
  validate: PropTypes.func
}

export default FormField
