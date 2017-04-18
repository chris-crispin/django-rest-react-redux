import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import React from 'react'
import PropTypes from 'prop-types'

const FormSelectField = ({label, value, values, helpText, onChange}) => {
  const _onChange = (e) => {
    if (onChange) {
      onChange(e)
    }
  }
  let selections = []
  if (values) {
    selections = Object.keys(values).map((key, i) => <option key={i} >{key}</option>)

    return (
      <FormGroup bsSize='sm' controlId='formControlsSelect'>
        <ControlLabel>{label}</ControlLabel>
        <FormControl componentClass='select'
          defaultValue={value}
          onChange={(e) => _onChange(e)}>
          {selections}
        </FormControl>
        { helpText &&
          <HelpBlock>{helpText}</HelpBlock> }
      </FormGroup>
    )
  }
  return null
}

FormSelectField.PropTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  helpText: PropTypes.string,
  onChange: PropTypes.func
}

export default FormSelectField
