import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import React from 'react'
import PropTypes from 'prop-types'

export class FormSelectField extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      searchTerm: ''
    }
  }

  _onChange (e) {
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  _onSearch (e) {
    const searchTerm = e.target.value
    this.setState({searchTerm: searchTerm})
    if (searchTerm.length > 0) {
      this.props.searchSelections(searchTerm)
    }
  }

  render () {
    let selections = []
    const {values, label, value, helpText, searchSelections} = {...this.props}
    if (values) {
      selections = Object.keys(values)
      .map((key, i) => <option key={i} value={key}>{values[key]}</option>)

      return (
        <FormGroup bsSize='sm' controlId='formControlsSelect'>
          <ControlLabel>{label}</ControlLabel>
          {searchSelections &&
          <FormControl type='text' placeholder='Search'
            onChange={this._onSearch.bind(this)}
            value={this.state.searchTerm} />}
          <FormControl componentClass='select'
            defaultValue={value}
            onChange={(e) => this._onChange(e)}>
            {selections}
          </FormControl>
          { helpText &&
            <HelpBlock>{helpText}</HelpBlock> }
        </FormGroup>
      )
    }
    return null
  }
}

FormSelectField.PropTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  helpText: PropTypes.string,
  onChange: PropTypes.func,
  searchSelections: PropTypes.func
}

export default FormSelectField
