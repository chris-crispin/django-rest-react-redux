import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import React from 'react'
import PropTypes from 'prop-types'

const FormSelectField = ({label, value, values, helpText}) => {
  let selections = []
  if (values) {
    selections = Object.keys(values).map((keyValue, i) => <option key={i} >{keyValue}</option>)
  }

  return (
    <FormGroup controlId='formControlsSelect'>
      <ControlLabel>{label}</ControlLabel>
      <FormControl componentClass='select' defaultValue={value}>
        {selections}
      </FormControl>
      { helpText &&
        <HelpBlock>{helpText}</HelpBlock> }
    </FormGroup>
  )
}

FormSelectField.PropTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  helpText: PropTypes.string
}

export default FormSelectField
